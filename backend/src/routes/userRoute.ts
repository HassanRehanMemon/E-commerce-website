import express from "express";
import { authUser, getUserProfile } from "../controllers/userController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router()

router.post(
    '/login',
    authUser
)

router.route('/profile').get( authMiddleware, getUserProfile, )

export default router