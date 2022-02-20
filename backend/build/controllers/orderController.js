'use strict'
const __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
  function adopt (value) { return value instanceof P ? value : new P(function (resolve) { resolve(value) }) }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled (value) { try { step(generator.next(value)) } catch (e) { reject(e) } }
    function rejected (value) { try { step(generator.throw(value)) } catch (e) { reject(e) } }
    function step (result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected) }
    step((generator = generator.apply(thisArg, _arguments || [])).next())
  })
}
const __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { default: mod }
}
Object.defineProperty(exports, '__esModule', { value: true })
exports.deliverOrdersAsAdmin = exports.listOrdersAsAdmin = exports.updateOrderPaid = exports.getOrderbyId = exports.placeOrder = exports.getOrders = void 0
const express_async_handler_1 = __importDefault(require('express-async-handler'))
const orderModel_1 = __importDefault(require('../models/orderModel'))
exports.getOrders = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function * () {
  const orders = yield orderModel_1.default.find({ user: req.body.user._id })
  res.json(orders)
}))
exports.placeOrder = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function * () {
  const { cartItems, shippingAddress, paymentMethod, shippingFee, tax, totalPrice } = req.body
  const items = cartItems
  if (!cartItems && items.length === 0) {
    res.status(400)
    throw new Error('Order is empty')
  }
  console.log(cartItems, 'asdfasdf')
  const order = new orderModel_1.default({
    user: req.body.user._id,
    orderItems: cartItems,
    shippingAddress,
    paymentMethod,
    shippingFee,
    tax,
    totalPrice
  })
  const created = yield order.save()
  res.json(created)
}))
exports.getOrderbyId = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function * () {
  const order = yield orderModel_1.default.findById(req.params.id).populate('user', 'name email')
  if (!order) {
    res.status(404)
    throw new Error('Order Not found')
  }
  res.json(order)
}))
exports.updateOrderPaid = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function * () {
  const order = yield orderModel_1.default.findById(req.params.id).populate('user', 'name email')
  if (!order) {
    res.status(404)
    throw new Error('Order Not found')
  } else {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address
    }
    const updated = yield order.save()
    res.json(updated)
  }
}))
exports.listOrdersAsAdmin = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function * () {
  const order = yield orderModel_1.default.find({})
  if (!order) {
    res.status(404)
    throw new Error('Order Not found')
  }
  res.json(order)
}))
exports.deliverOrdersAsAdmin = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function * () {
  const order = yield orderModel_1.default.findById(req.params.id)
  order.deliveredAt = Date.now()
  order.isDelivered = true
  const updatedOrder = yield order.save()
  if (!order) {
    res.status(404)
    throw new Error('Order Not found')
  } else {
    res.json(updatedOrder)
  }
}))
