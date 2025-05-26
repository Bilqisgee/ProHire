import express from "express";
import { connectDB } from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authen/auth-routes.js";
import messageRoute from "./routes/messageRoutes.js";
import profileRoute from "./routes/admin/profileRoute.js"
import UserProfileRoutes from "./routes/user/UserProfileRoutes.js"; 
import {app, server} from "./config/socket.js"; 
import path from "path"


app.use(cookieParser());
app.use(express.json()); // Middleware to parse incoming JSON requests


app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "DELETE", "PUT"],
        allowedHeaders: ["Content-Type", "Authorization", "Cache-Control", "Expires", "Pragma"],
        credentials: true,
    })
);

// Routes
app.use("/api/authen", authRoutes);
app.use("/api/messages", messageRoute);
app.use("/api/admin/profile-admin", profileRoute)
app.use("/api/user/profile", UserProfileRoutes);
app.use("/api/user/service", UserProfileRoutes)


if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(_dirname, "/frontend/dist")));

    app.get("*", (req,res) => {
        res.sendFile(path.join(_dirname, "../frontend/dist/index.html"));
    })

}


// Define port
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();




// Connect DB and start server
connectDB();

server.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
}).on("error", (err) => {
    console.error("Server error:", err);
});