import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-slice';
import profileReducer from "@/store/admin/ProfileSlice"
import messageReducer from "@/store/common/messageSlice";
import userProfileReducer from "@/store/user/UserProfileSlice";



const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        message: messageReducer,
        userProfile: userProfileReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false 
        })
})


export default store; 


