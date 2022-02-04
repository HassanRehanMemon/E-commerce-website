import express from "express";
import prodcutRoutes from './routes/productRoutes'
import mongoose from 'mongoose'
import dotenv from "dotenv";
import connectDB from "./config/db";

const app = express();
dotenv.config()
connectDB()

app.get('/', (req, res) => {
    res.send('Api is running')
})

app.use('/api/products' ,prodcutRoutes)

app.listen(5000, () => {
    console.log('api is running ')
})