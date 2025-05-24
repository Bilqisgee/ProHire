import bcrypt from "bcryptjs";
import User from "../../models/User.js";
import { generateToken } from "../../config/utils.js";
import Profile from "../../models/admin/ProfileAdmin.js"
import UserProfile from "../../models/user/UserProfile.js"
import cloudinary from "../../config/cloudinary.js";


// Signup
export const signupUser = async (req, res) => {
    const { userName, email, password, role } = req.body; 
    try {
        if (!userName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
          }

          if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
          }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "Email already exists. Try again."
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);
       
       
        const newUser = new User({
            userName,
            email,
            password: hashPassword,
            role: role || "user",
        });

        await newUser.save();
        generateToken(newUser._id, res);
        
let newProfile 
if(role === "admin"){
    newProfile = new Profile({
        userId: newUser._id,
        name: userName,
        title: "",
        gender: '',
        image: "",
        address: '',
        city: '',
        phone: '',
        email: email,
        description: '',
    })
} else{
    newProfile = new UserProfile({
userId: newUser._id,
name: userName,
gender: '', 
image:"",
phone: '',
email: email,
    })
}


await newProfile.save();

        res.status(201).json({
            success: true,
            message: "Signup Successful",
            user: {
                _id: newUser._id,
                userName: newUser.userName,
                email: newUser.email,
                role: newUser .role
            },
            profile: newProfile
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error occurred"
        });
    }
};

// Login
export const loginUser = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found. Signup first."
            });
        }
     
generateToken(user._id, res);

res.status(200).json({
    success: true,
user: {
    _id: user._id,
    email: user.email,
    role: user.role, 
}
})
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error Occurred"
        });
    }
};

// Logout
export const logoutUser = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
      } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
      }
    };
    

//checkauth
export const checkAuth = (req, res) => {
    const user = req.user;
    if (!user) {
        return res.status(401).json({
            success: false,
            message: "User  not authenticated"
        });
    }
    res.status(200).json({
        success: true,
        message: "Authenticated user",
        user
    });
}