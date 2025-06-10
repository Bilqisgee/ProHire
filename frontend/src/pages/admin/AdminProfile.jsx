// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile, fetchProfiles } from "@/store/admin/ProfileSlice";
import { useToast } from "@/hooks/use-toast";
import History from "@/components/common/History";
import { viewUserRequest } from "@/config";


const profileadFormControl = {
    name: "",
    email: "",
    gender: "",
    phone: "",
    title: "",
    description: "",
    address: "",
    city: "",
    image: "",
};

const titles = [
    "HouseKeeper",
    "Nanny",
    "Cook",
    "Driver",
    "Gardner",
    "Caregiver",
    "Security Guard",
    "Laundry Attendant",
    "Babysitter",
];

function AdminProfile() {
    const [formData, setFormData] = useState(profileadFormControl);
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const loggedInUser  = useSelector((state) => state.auth.user);
    const loggedInUserName = loggedInUser ?.userName;
    const { profileId } = useSelector((state) => state.profile);
    const { toast } = useToast();

    useEffect(() => {
        if (user?._id) {
            dispatch(fetchProfiles(user._id));
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
               if (!formData) {
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
                       updateProfile({
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

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

   
    function handleImageChange(e) {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setFormData({ ...formData, image: file, imageUrl });
        }
        
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-white w-full h-full p-4 ">
            <Card className="w-full p-6  bg-white rounded-lg">
                <div className="flex items-center space-x-6 lg:w-1/2">
                    <img
                        src={formData.image || "/assets/profile-icon.jpg"}
                        alt="Profile Picture"
                        className="bg-gray-400 size-52 rounded-full"
                    />
                    <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                            {isEditing ? (
                                <Input name="name" value={formData.name} onChange={handleInputChange} />
                            ) : (
                                <p className="text-2xl font-bold">{loggedInUserName}</p>
                            )}
                            {isEditing ? (
                                <Button 
                                    onClick={handleManageProfile} 
                                    className="bg-green-950 text-white px-2 py-4 ml-2 hover:bg-green-900"
                                >
                                    Update
                                </Button>
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
                            <select
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded"
                            >
                                <option value="">Select Title</option>
                                {titles.map((title) => (
                                    <option key={title} value={title}>
                                        {title}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <p>Title: {formData.title}</p>
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
                            <Input name="phone" type="tel" required pattern="[0-9]{10,15}" placeholder="Phone number" value={formData.phone} onChange={handleInputChange} />
                        ) : (
                            <p>Phone: {formData.phone}</p>
                        )}
                    </div>
                </div>

                {isEditing && (
                    <div className="flex-1 space-y-2 mt-5 ml-8">
                        <p className="text-gray-700 font-medium">Choose a picture</p>
                        <Input type="file" accept="image/*" className="border-green-950 w-32 mt-5" onChange={handleImageChange} />
                    </div>
                )}

                <CardContent className="mt-6">
                    <label className="text-gray-700 font-medium">Description</label>
                    {isEditing ? (
                        <Textarea name="description" placeholder="Write about yourself and your work..." value={formData.description} onChange={handleInputChange} />
                    ) : (
                        <p>{formData.description}</p>
                    )}
                </CardContent>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="text-gray-700 font-medium">Address</label>
                        {isEditing ? (
                            <Input name="address" placeholder="123 Street Name" value={formData.address} onChange={handleInputChange} />
                        ) : (
                            <p>{formData.address}</p>
                        )}
                    </div>
                    <div>
                        <label className="text-gray-700 font-medium">City</label>
                        {isEditing ? (
                            <Input name="city" placeholder="City Name" value={formData.city} onChange={handleInputChange} />
                        ) : (
                            <p>{formData.city}</p>
                        )}
                    </div>
                </CardContent>
                <hr className="flex border border-green-950 mt-6" />
                <CardContent>
                    {/*applied jobs*/}
                    <div className="container mx-auto p-4">
                    <table className="w-full max-w-4xl bg-white border-gray-200 max-sm:text-sm">
    <thead>
        <tr className="border-b">
            <th className="py-2 px-4 text-left">#</th>
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Title</th>
            <th className="py-2 px-4 text-left">Status</th>
        </tr>
    </thead>
    <tbody>
        {viewUserRequest.map((user, index) => (
            <tr key={index} className="text-gray-700">
                <td className="py-2 px-4 border-b text-center">{index + 1}</td>
                <td className="py-2 px-4 border-b text-center flex">
                    <img className="w-10 h-10 rounded-full mr-3 max-sm:hidden" src={user.image} alt="profile" />
                    <span>{user.name}</span>
                </td>
                <td className="py-2 px-4 border-b text-center">{user.title}</td>
                <td className="py-2 px-4 border-b relative">
                    <div className="relative inline-block text-left group">
                        <button className="text-gray-500 action-button">...</button>
                        <div className="z-10 hidden absolute right-0 md:left-0 top-0 mt-2 bg-white border border-gray-200 rounded shadow group-hover:block">
                            <button className="block max-w-full text-left px-4 py-2 text-green-950 hover:bg-green-900">Accept</button>
                        </div>
                    </div>
                </td>
            </tr>
        ))}
    </tbody>
</table>
                    </div>
                </CardContent>
                <hr className="flex border border-green-950 mt-6" />
                <CardContent className="flex bg-white w-50 min-h-60 mt-10">
                    <div>
                        <h1 className="font-medium text-3xl">History </h1>
                        <History type="user" />
                    </div>
                </CardContent>
               
            </Card>
        </div>
    );
}

export default AdminProfile;