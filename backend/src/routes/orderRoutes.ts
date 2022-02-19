
import express from 'express'
import asyncHandler from 'express-async-handler'
import { deliverOrdersAsAdmin, getOrderbyId, getOrders, listOrdersAsAdmin, placeOrder, updateOrderPaid } from '../controllers/orderController';
import { adminMiddleware, authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();


router.route('/')
    .get(authMiddleware, adminMiddleware, listOrdersAsAdmin)
    .post(authMiddleware, placeOrder)
router.route('/userOrders').get(authMiddleware, getOrders)
router.route('/:id').get(authMiddleware, getOrderbyId)
router.route('/:id/pay').put(authMiddleware, updateOrderPaid)
router.route('/:id/deliver')
    .put(authMiddleware,adminMiddleware, deliverOrdersAsAdmin)



export default router



