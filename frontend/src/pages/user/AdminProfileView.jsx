// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { viewProfile } from "@/store/user/UserProfileSlice";


function AdminView() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // Get the profile from the Redux state
    const profile = useSelector((state) => state.userProfile.profileId);
    const isLoading = useSelector((state) => state.userProfile.isLoading);
    const error = useSelector((state) => state.userProfile.error);

    useEffect(() => {
        console.log("Profile ID from URL:", id);
        if (id) {
            dispatch(viewProfile(id)); // Fetch the profile data
        }
    }, [dispatch, id]);

    console.log("Fetched Profile:", profile);

    function handleMessageClick() {
        if (profile) {
            navigate(`/messages`);
        }
    }
   if(!profile) return <p className="text-center mt-10">Profile not found.</p>;
    if (isLoading) return <p className="text-center mt-10">Loading...</p>;
    if (error) return <p className="text-center mt-10">Error: {error}</p>;
    return (
        <div className="">
            <Card className="container mx-auto max-w-2xl lg:max-w-5xl mt-10">
                <div className="flex flex-col items-center">
                    <img
                        src={profile.image || "/assets/profile-icon.jpg"} // Ensure the default image URL is correct
                        alt="Profile"
                        className="bg-gray-400 size-52 rounded-full mt-2 mb-4"
                    />
                    <h2 className="text-2xl font-bold">{profile.name}</h2>
                    <p className="text-gray-600">{profile.title}</p>
                </div>

                <CardContent className="mt-6">
                    <p><strong>Email:</strong> {profile.email}</p>
                    <p><strong>Phone:</strong> {profile.phone}</p>
                    <p><strong>Gender:</strong> {profile.gender}</p>
                </CardContent>

                <CardContent>
                    <h3 className="font-semibold">Description</h3>
                    <p>{profile.description || "No description available."}</p>
                </CardContent>

                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <h3 className="font-semibold">Address</h3>
                        <p>{profile.address || "Not provided"}</p>
                    </div>
                    <div className="mr-10">
                        <h3 className="font-semibold">City</h3>
                        <p>{profile.city || "Not provided"}</p>
                    </div>
                </CardContent>
                <CardContent className="flex justify-end space-x-4 mt-4">
                    <Button onClick={handleMessageClick} className="bg-green-950 text-white px-2 py-4 p-3 hover:bg-green-900 lg:p-5">
                        Message
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}

export default AdminView;