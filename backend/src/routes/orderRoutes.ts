
import express from 'express'
import asyncHandler from 'express-async-handler'
import { getOrders, placeOrder } from '../controllers/orderController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();


router.route('/').post(authMiddleware, placeOrder)
router.route('/userOrders').get(authMiddleware, getOrders)

export default router



