
import express from 'express'
import asyncHandler from 'express-async-handler'
import { getOrderbyId, getOrders, placeOrder, updateOrderPaid } from '../controllers/orderController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();


router.route('/').post(authMiddleware, placeOrder)
router.route('/userOrders').get(authMiddleware, getOrders)
router.route('/:id').get(authMiddleware, getOrderbyId)
router.route('/:id/pay').put(authMiddleware, updateOrderPaid)

export default router



