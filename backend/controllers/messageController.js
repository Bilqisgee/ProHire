import User from "../models/User.js";
import Message from "../models/Message.js";
import cloudinary from "../config/cloudinary.js";
import {getReceiverSocketId, io} from "../config/socket.js";

export const getUsers = async (req, res) => {
try {
  const userId = req.user._id;
  console.log("Logged in user:", userId);

  const messages = await Message.find({
    $or: [
      { senderId: userId },
      { receiverId: userId }
    ]
  }).select("senderId receiverId")
  console.log("Messages found:", messages.length);

  const userIds =  new Set();

  messages.forEach((message) => {
    if (message.senderId.toString() !== userId.toString()) {
      userIds.add(message.senderId.toString())
    }
    if (message.receiverId.toString() !== userId.toString()) {
      userIds.add(message.receiverId.toString())
    }
  })
  console.log("User IDs to fetch:", [...userIds]);

  const users = await User.find({ _id: { $in: [...userIds] } }).select("-password");

  res.status(200).json(users);

} catch (error) {
  console.error("Error in fetching users: ", error.message);
  res.status(500).json({ error: "Internal server error" });
}

}
export const getMessages = async (req, res) => {
  try {
    
const userId = req.user._id;
const otherUserId = req.params.id;

const messages = await Message.find({
  $or: [
  {senderId: userId, receiverId: otherUserId },
  {senderId: otherUserId, receiverId: userId }
  ]
}).sort({
  timestamp: 1
})

res.status(200).json(messages);

  } catch (error) {
    console.error("Error in fetching messages: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
    
  }
export const sendMessage = async (req, res) => {
  try {
    const senderId = req.user._id;
    const {receiverId, text, image} = req.body;

    let imageUrl;
    if (image) {
      // Upload base64 image to cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

if(!receiverId || !text) {
  return res.status(400).json({ error: "Receiver ID and text are required" });

}


const message = await Message.create({
  senderId,
  receiverId,
  text,
  image: imageUrl,
})


const receiverSocketId = getReceiverSocketId(receiverId);
if (receiverSocketId) {
  io.to(receiverSocketId).emit("Message", message);
}


res.status(201).json(message);

  } catch (error) {
    console.error("Error in sending message: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
    
   
}