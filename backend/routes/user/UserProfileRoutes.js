import express from 'express';
import { fetchUserProfiles, updateUserProfile } from '../../controllers/user/UserProfileController.js';
import { viewProfile } from '../../controllers/admin/ProfileAdminController.js';

const router = express.Router();


router.get("/get/:userId", fetchUserProfiles);
router.put("/update/:userId/:profileId", updateUserProfile);
router.get('/admin-view/:profileId', viewProfile);

export default router;