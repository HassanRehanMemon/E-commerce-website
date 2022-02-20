import express from 'express'
import { authUser, deleteUserAsAdmin, getUserByIdAsAdmin, getUserProfile, getUsersAsAdmin, registerUesr, updateUserAsAdmin } from '../controllers/userController'
import { adminMiddleware, authMiddleware } from '../middleware/authMiddleware'

const router = express.Router()

router.route('/')
  .post(registerUesr)
  .get(authMiddleware, adminMiddleware, getUsersAsAdmin)

router.post(
  '/login',
  authUser
)

router.route('/profile').get(authMiddleware, getUserProfile)

router.route('/:id')
  .get(authMiddleware, adminMiddleware, getUserByIdAsAdmin)
  .put(authMiddleware, adminMiddleware, updateUserAsAdmin)
  .delete(authMiddleware, adminMiddleware, deleteUserAsAdmin)

export default router
