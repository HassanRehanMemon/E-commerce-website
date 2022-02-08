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
    if(!cartItems && items.length === 0){
        res.status(400)
        throw new Error('Order is empty')
    }

    const order = new Order({
        user: req.body.user._id,
        cartItems,
        shippingAddress,
        paymentMethod,
        shippingFee,
        tax,
        totalPrice
    })
    
    const created = await order.save()

    res.json(created)

})

