import express from "express";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import { signupUser, loginUser, logoutUser,  checkAuth } from "../../controllers/authen/auth-controller.js"
const router = express.Router();


router.post('/signup', signupUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.get('/checkauth', authMiddleware, checkAuth )

export default router


