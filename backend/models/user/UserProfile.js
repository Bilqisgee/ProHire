import mongoose from "mongoose";

const UserProfileSchema = new mongoose.Schema({
  
    userId: String,
    name: String,
    gender: String,
    image: {  type: String, default: ""},
    phone: Number,
    email: String,
},
{
    timestamps: true
})
const UserProfile = mongoose.model("UserProfile", UserProfileSchema);
export default UserProfile;