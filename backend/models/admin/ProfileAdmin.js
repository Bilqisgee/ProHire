import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({

    userId: String,
    name: String,
    gender: String,
    image: { type: String, default: ""},
    address: String,
    city: String,
    phone: String,
    description: String,
    title: String,
    email: String,            

},
{
    timestamps: true
}
);
const Profile = mongoose.model("Profile", ProfileSchema);

export default Profile