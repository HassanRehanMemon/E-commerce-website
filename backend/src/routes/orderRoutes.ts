
import express from 'express'
import asyncHandler from 'express-async-handler'
import { getOrderbyId, getOrders, placeOrder } from '../controllers/orderController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();


router.route('/').post(authMiddleware, placeOrder)
router.route('/userOrders').get(authMiddleware, getOrders)
router.route('/:id').get(authMiddleware, getOrderbyId)

export default router



