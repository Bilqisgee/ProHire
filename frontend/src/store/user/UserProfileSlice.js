import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    userProfile: [],
    profileId: [],
}

export const  fetchUserProfiles = createAsyncThunk(
    "profile/fetchUserProfiles",
    async (userId) => {
        const response = await axios.get(`http://localhost:5000/api/user/profile/get/${userId}`);
        return response.data;
    }
)

export const viewProfile = createAsyncThunk(
    "profiles/viewProfile", async (profileId) => {
        const response = await axios.get(`http://localhost:5000/api/user/profile/admin-view/${profileId}`);
        console.log('API Response:', response.data);
        return response.data.data
    }
)

export const updateUserProfile = createAsyncThunk(
    "profile/updateUserProfile",
    async ({ userId, profileId, formData }) => {



        if (!userId || !profileId) {
            throw new Error("userId and profileId must be defined");
        }

        try {
            const response = await axios.put(
              `http://localhost:5000/api/user/profile/update/${userId}/${profileId}`  ,
                formData
            );
            console.log("Update Profile Response:", response.data);
            return response.data; // Ensure this returns the updated profile
        } catch (error) {
            console.error("Error in updateProfile thunk:", error);
            throw error;
        }
    }
)


const userProfileSlice = createSlice({
name: "userProfile",
initialState,
reducers: {},
extraReducers: (builder) => {
builder.addCase(fetchUserProfiles.pending, (state) => {
state.isLoading = true;
}).addCase(fetchUserProfiles.fulfilled, (state, action) => {
    state.isLoading = false;
    console.log("Fetched user profile:", action.payload); 
    state.profileId = action.payload.data;
}).addCase(fetchUserProfiles.rejected, (state) => {
state.isLoading = false;
state.profileId = [];
}).addCase(updateUserProfile.pending, (state) => {
state.isLoading = true;
}).addCase(updateUserProfile.fulfilled, (state, action) => {
state.isLoading = false;
const updatedUserProfile = action.payload.data;
state.profileId = state.profileId.map(profile =>
    profile._id === updatedUserProfile._id ? updatedUserProfile : profile
);
}).addCase(updateUserProfile.rejected, (state) => {
    state.isLoading = false;
}) .addCase(viewProfile.pending, (state) => {
    state.isLoading = true;
})
.addCase(viewProfile.fulfilled, (state, action) => {
    state.isLoading = false;
    state.profileId = action.payload; // Store the fetched profile
})
.addCase(viewProfile.rejected, (state, action) => {
    state.isLoading = false;
    state.error = action.error.message;
});
}
})

export default userProfileSlice.reducer;