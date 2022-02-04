import express from "express";
import prodcutRoutes from './routes/productRoutes'
import mongoose from 'mongoose'
import dotenv from "dotenv";
import connectDB from "./config/db";
import { errorHandler, notFound } from "./middleware/errorMiddleware";

const app = express();
dotenv.config()
connectDB()

app.get('/', (req, res) => {
    res.send('Api is running')
})

app.use('/api/products' ,prodcutRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(5000, () => {
    console.log('api is running ')
})