import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    serviceProfiles: [],
    profileId: [], // Assuming this is an array of profiles
};



export const fetchProfiles = createAsyncThunk(
    "profile/fetchProfiles",
    async (userId) => {
        const response = await axios.get(`http://localhost:5000/api/admin/profile-admin/get/${userId}`);
        return response.data;
    }
);


export const fetchAllProfiles = createAsyncThunk(
    "profile/fetchAllProfiles", async () => {
        const response = await axios.get(`http://localhost:5000/api/admin/profile-admin/service`);
        return response.data; 
    }
    
) 

// Update a profile
export const updateProfile = createAsyncThunk(
    "profile/updateProfile",
    async ({ userId, profileId, formData }) => {
        try {
            const response = await axios.put(
                `http://localhost:5000/api/admin/profile-admin/update/${userId}/${profileId}`,
                formData
            );
            console.log("Update Profile Response:", response.data);
            return response.data; // Ensure this returns the updated profile
        } catch (error) {
            console.error("Error in updateProfile thunk:", error);
            throw error;
        }
    }
);

// Create the slice
const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProfiles.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchProfiles.fulfilled, (state, action) => {
                state.isLoading = false;
                state.profileId = action.payload.data; // Assuming the response contains an array of profiles
            })
            .addCase(fetchProfiles.rejected, (state) => {
                state.isLoading = false;
                state.profileId = [];
            }).addCase(fetchAllProfiles.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAllProfiles.fulfilled, (state, action) => {
                state.isLoading = false;
                state.serviceProfiles = action.payload.data; // Assuming the response contains an array of service profiles
            })
            .addCase(fetchAllProfiles.rejected, (state) => {
                state.isLoading = false;
                state.serviceProfiles = []; 
            }).addCase(updateProfile.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                const updatedProfile = action.payload.data; // Adjust based on your API response
                // Update the specific profile in the array
                state.profileId = state.profileId.map(profile =>
                    profile._id === updatedProfile._id ? updatedProfile : profile
                );
            })
            .addCase(updateProfile.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export default profileSlice.reducer;