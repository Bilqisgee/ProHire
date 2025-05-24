import express from "express"
import { authMiddleware } from "../middleware/authMiddleware.js"
import { getMessages, getUsers, sendMessage} from "../controllers/messageController.js";
const router = express.Router();


router.get("/users", authMiddleware, getUsers)
router.get("/chat/:id", authMiddleware, getMessages)
router.post("/send", authMiddleware, sendMessage)

export  default router