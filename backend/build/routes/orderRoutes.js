'use strict'
const __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { default: mod }
}
Object.defineProperty(exports, '__esModule', { value: true })
const express_1 = __importDefault(require('express'))
const orderController_1 = require('../controllers/orderController')
const authMiddleware_1 = require('../middleware/authMiddleware')
const router = express_1.default.Router()
router.route('/')
  .get(authMiddleware_1.authMiddleware, authMiddleware_1.adminMiddleware, orderController_1.listOrdersAsAdmin)
  .post(authMiddleware_1.authMiddleware, orderController_1.placeOrder)
router.route('/userOrders').get(authMiddleware_1.authMiddleware, orderController_1.getOrders)
router.route('/:id').get(authMiddleware_1.authMiddleware, orderController_1.getOrderbyId)
router.route('/:id/pay').put(authMiddleware_1.authMiddleware, orderController_1.updateOrderPaid)
router.route('/:id/deliver')
  .put(authMiddleware_1.authMiddleware, authMiddleware_1.adminMiddleware, orderController_1.deliverOrdersAsAdmin)
exports.default = router
