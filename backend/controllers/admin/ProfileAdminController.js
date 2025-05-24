import Profile from "../../models/admin/ProfileAdmin.js";
import cloudinary from "../../config/cloudinary.js";


export const fetchAllProfiles = async (req, res) => {
try {
  const profiles = await Profile.find();
  console.log("Profile found:", profiles);
  res.status(200).json({
    success: true,
    data: profiles,
  })
} catch (error) {
  console.error("Error in fetchServiceProfiles:", error);
  res.status(500).json({
      success: false,
      message: "Error",
  });
}
}

export const fetchProfiles = async (req, res) => {
try {
    
const {userId} = req.params;
if(!userId){
return res.status(400).json({
    success: false,
    message: "User id is required",
})
}
 

const profile = await Profile.find({ userId}); 
console.log("Profile found:", profile); 

if (!profile) {
    return res.status(404).json({
        success: false,
        message: "Profile not found",
    });
}
res.status(200).json({
    success: true,
    data: profile, // Return the found profile
});
} catch (error) {
console.error("Error in fetchProfiles:", error);
res.status(500).json({
    success: false,
    message: "Error",
});
}


}


export const updateProfile = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    const { userId, profileId } = req.params;
    const formData = req.body;
    const { image } = formData; // Assuming the image is sent in the request body

    if (!userId || !profileId) {
      return res.status(400).json({
        success: false,
        message: "User  and Profile id is required!",
      });
    }

    
    if (!image) {
      return res.status(400).json({ message: "Profile pic is required" });
  
    }
    const uploadResponse = await cloudinary.uploader.upload(image);
    const updatedFormData = {
      ...formData,
      image: uploadResponse.secure_url, // Add the uploaded image URL to the form data
    };


    const profile = await Profile.findByIdAndUpdate(
      {
        _id: profileId,
        userId,
      },
updatedFormData,
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error.message);
    res.status(500).json({
      success: false,
      message: "Error uploading image to Cloudinary",
    });
  }
};

export const viewProfile = async(req, res) => {
  try {
    const {profileId} = req.params;
    console.log("Received profileId:", profileId);
    if(!profileId){
      return res.status(400).json({
        success: false,
        message: "Profile ID is required",
    });
    }

    const profile = await Profile.findById(profileId);
    console.log("Profile found:", profile); // Log the found profile

    // Check if the profile exists
    if (!profile) {
        return res.status(404).json({
            success: false,
            message: "Profile not found",
        });
    }
    res.status(200).json({
      success: true,
      data: profile,
  });
  } catch (error) {
    console.error("Error in viewProfile:", error);
    res.status(500).json({
        success: false,
        message: "Error",
    });
  }
}

export const history = async(req, res) => {
  
}