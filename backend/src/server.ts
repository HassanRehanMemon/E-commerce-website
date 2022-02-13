import express, { Request, Response } from "express";
import prodcutRoutes from './routes/productRoutes'
import userRoutes from './routes/userRoute'
import orderRoutes from './routes/orderRoutes'
import mongoose from 'mongoose'
import dotenv from "dotenv";
import connectDB from "./config/db";
import { errorHandler, notFound } from "./middleware/errorMiddleware";
import bp from "body-parser";

const app = express();
dotenv.config()
connectDB()

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('Api is running')
})

app.use('/api/products' ,prodcutRoutes)
app.use('/api/users',  userRoutes)
app.use('/api/orders',  orderRoutes)
app.use('/api/config/paypal',  (req: Request, res:Response) => {
    res.send(process.env.PAYPAL_CLIENT_ID )
})

app.use(notFound)
app.use(errorHandler)

app.listen(5000, () => {
    console.log('api is running ')
})