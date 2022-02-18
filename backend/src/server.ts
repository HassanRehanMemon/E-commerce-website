import express, { Request, Response } from "express";
import prodcutRoutes from './routes/productRoutes'
import userRoutes from './routes/userRoute'
import uploadRoutes from './routes/uploadRoutes'
import orderRoutes from './routes/orderRoutes'
import mongoose from 'mongoose'
import dotenv from "dotenv";
import connectDB from "./config/db";
import { errorHandler, notFound } from "./middleware/errorMiddleware";
import bp from "body-parser";
import path from "path";

const app = express();
dotenv.config()
connectDB()

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))



app.use('/api/products', prodcutRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/config/paypal', (req: Request, res: Response) => {
    res.send(process.env.PAYPAL_CLIENT_ID)
})

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === "production") {
    const __dirname = path.resolve()
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    app.get('*', (req: Request, res: Response) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    })
} else {

    app.get('/', (req, res) => {
        res.send('Api is running ' + __dirname)
    })
}


app.use(notFound)
app.use(errorHandler)

const PORT = process.env.port || 5000

app.listen(PORT, () => {
    console.log('starting listening')
})