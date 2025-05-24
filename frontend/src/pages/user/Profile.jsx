// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import History from "@/components/common/History";
import { fetchUserProfiles, updateUserProfile } from "@/store/user/UserProfileSlice";
import { useToast } from "@/hooks/use-toast";

const userProfile = {
    name: "",
    email: "",
    gender: "",
    phone: "",
    image: "",
};

function Profile() {
    const loggedInUser  = useSelector((state) => state.auth.user);
    const loggedInUserName = loggedInUser ?.userName;
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(userProfile);
    const dispatch = useDispatch();
    const { toast } = useToast();
    const { user } = useSelector((state) => state.auth);
    const { profileId } = useSelector((state) => state.userProfile);


  
      useEffect(() => {
          if (user?._id) {
              dispatch(fetchUserProfiles(user._id));
          }
      }, [dispatch, user?._id]);
  
      useEffect(() => {
          if (profileId.length > 0) {
              console.log("Fetched profile:", profileId);
              setFormData(profileId[0]);
          }
      }, [profileId, user?.id]);
      
   function handleManageProfile(e) {
           e.preventDefault();
   
           console.log("User Object:", user);
   
           
           // Check for required fields
           if (!formData.name || !formData.email || !formData.phone) {
               toast({
                   title: "Please fill in all required fields",
                   variant: "destructive",
               });
               return;
           }
   
           const userId = user?._id; // Use _id for user ID
           const profileIdValue = formData._id; // Ensure this is set correctly
           if (userId && profileIdValue) { // Check if both IDs are defined
               console.log("Updating profile with data:", formData);
               dispatch(
                   updateUserProfile({
                       userId: userId,
                       profileId: profileIdValue,
                       formData,
                   })
               ).then((data) => {
                   if (data?.payload?.success) {
                       toast({
                           title: "Profile updated successfully",
                       });
                       setIsEditing(false);
                   } else {
                       toast({
                           title: "Failed to update profile",
                           variant: "destructive",
                       });
                   }
               }).catch((error) => {
                   console.error("Error updating profile:", error);
                   toast({
                       title: "Error updating profile",
                       variant: "destructive",
                   });
               });
           } 
           
       }
   
    
    function handleEditClick() {
        setIsEditing(true);
    }

    function handleInputChange(e) {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    function handleImageChange(e) {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setFormData({ ...formData, image: file, imageUrl });
        }
    }

    return (
        <div className="flex min-h-screen bg-gray-200 p-4">
            <Card className="w-full p-6 bg-white rounded-lg">
                <div className="flex items-center space-x-6">
                    <img
                        src={formData.image ? formData.image : "assets/profile-icon.jpg"}
                        alt="Profile"
                        className="bg-gray-400 flex size-64 mt-10 lg:items-center"
                    />
                    <div className="flex-1 space-y-2 ml-10">
                        <div className="flex items-center justify-between gap-3">
                            {isEditing ? (
                                <Input name="name" value={formData.name} onChange={handleInputChange} />
                            ) : (
                                <p className="text-2xl font-bold">{loggedInUserName}</p>
                            )}
                            {isEditing ? (
                                <Button onClick={handleManageProfile} className="bg-green-950 text-white px-2 py-4">Update</Button>
                            ) : (
                                <Button onClick={handleEditClick} className="bg-green-950 text-white px-2 py-4">
                                    <Pencil size={16} /> Edit Profile
                                </Button>
                            )}
                        </div>
                        {isEditing ? (
                            <Input name="email" placeholder="Enter your email" value={formData.email} onChange={handleInputChange} />
                        ) : (
                            <p>Email: {formData.email}</p>
                        )}
                        {isEditing ? (
                            <select name="gender" value={formData.gender} onChange={handleInputChange}>
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        ) : (
                            <p>Gender: {formData.gender}</p>
                        )}
                        {isEditing ? (
                            <Input name="phone" type="tel" placeholder="Phone number" value={formData.phone} onChange={handleInputChange} />
                        ) : (
                            <p>Phone: {formData.phone}</p>
                        )}
                    </div>
                </div>

                {isEditing && (
                    <div className="mt-5">
                        <p className="text-gray-700 font-medium">Choose a picture</p>
                        <Input type="file" accept="image/*" className="border-green-950 w-32 mt-2" onChange={handleImageChange} />
                    </div>
                )}
                <hr className="flex border border-green-950 mt-6" />
                {/* History */}
                <CardContent className="flex bg-white w-50 min-h-60 mt-10">
                    <div>
                        <h1 className="font-medium text-3xl">History of workers hired</h1>
                        <History type="admin" />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}


export default Profile;