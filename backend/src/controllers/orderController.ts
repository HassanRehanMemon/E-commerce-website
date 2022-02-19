import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel";

export const getOrders = expressAsyncHandler(async (req: Request, res: Response) => {

    const orders = await Order.find({ user: req.body.user._id })
    res.json(orders)
})


export const placeOrder = expressAsyncHandler(async (req: Request, res: Response) => {
    const {
        cartItems,
        shippingAddress,
        paymentMethod,
        shippingFee,
        tax,
        totalPrice

    } = req.body

    const items = cartItems as []
    if (!cartItems && items.length === 0) {
        res.status(400)
        throw new Error('Order is empty')
    }
    console.log(cartItems, "asdfasdf")

    const order = new Order({
        user: req.body.user._id,
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        shippingFee,
        tax,
        totalPrice
    })

    const created = await order.save()

    res.json(created)

})




export const getOrderbyId = expressAsyncHandler(async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')
    if (!order) {
        res.status(404)
        throw new Error('Order Not found')
    }

    res.json(order)
})




export const updateOrderPaid = expressAsyncHandler(async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')
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
        const updated = await order.save()
        res.json(updated)

    }
})



export const listOrdersAsAdmin = expressAsyncHandler(async (req: Request, res: Response) => {
    const order = await Order.find({})
    if (!order) {
        res.status(404)
        throw new Error('Order Not found')
    }

    res.json(order)
})



export const deliverOrdersAsAdmin = expressAsyncHandler(async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.id)
    
    order.deliveredAt = Date.now()
    order.isDelivered = true
    
    const updatedOrder = await order.save()

    if (!order) {
        res.status(404)
        throw new Error('Order Not found')
    } else {

        res.json(updatedOrder)
    }

})

