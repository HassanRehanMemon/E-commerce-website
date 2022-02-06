import express from "express";
import prodcutRoutes from './routes/productRoutes'
import userRoutes from './routes/userRoute'
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

app.use(notFound)
app.use(errorHandler)

app.listen(5000, () => {
    console.log('api is running ')
})