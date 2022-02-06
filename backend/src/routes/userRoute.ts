import express from "express";
import { authUser, getUserProfile, registerUesr } from "../controllers/userController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router()

router.route('/').post(registerUesr)

router.post(
    '/login',
    authUser
)

router.route('/profile').get( authMiddleware, getUserProfile, )

export default router