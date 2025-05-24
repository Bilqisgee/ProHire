import UserProfile from '../../models/user/UserProfile.js';
import cloudinary from '../../config/cloudinary.js';


export const fetchUserProfiles = async (req, res) => {
    try {
      
        
const {userId} = req.params;
if(!userId){
    return res.status(400).json({
        success: false,
        message: "User id is required",
    });
}

const profiles = await UserProfile.find({ userId});
console.log("Profiles found:", profiles)
res.status(200).json({
    success: true,
    data: profiles,
  });

} catch (error) {
    console.log(error);
        res.status(500).json({
          success: false,
          message: "Error",
        });
    }
}

export const updateUserProfile = async (req, res) => {
    try {
      
       const {userId, profileId} = req.params ;
      
       const formData = req.body;
      const { image } = formData;

       if(!userId || !profileId){
       
        return res.status(400).json({
            success: false,
            message: "User and Profile id is required!",
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

const profile = await UserProfile.findByIdAndUpdate({
    _id: profileId,
    userId,
}, 
updatedFormData, 
{
    new: true
});

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
        console.log(error);
        res.status(500).json({
          success: false,
          message: "Error",
        });
    }
}

