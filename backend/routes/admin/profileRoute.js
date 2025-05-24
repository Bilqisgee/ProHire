import express from "express";
import {  updateProfile,  fetchProfiles, fetchAllProfiles} from "../../controllers/admin/ProfileAdminController.js";


const router = express.Router();


router.get("/get/:userId", fetchProfiles);
router.get("/service", fetchAllProfiles)
router.put("/update/:userId/:profileId", updateProfile);

export default router