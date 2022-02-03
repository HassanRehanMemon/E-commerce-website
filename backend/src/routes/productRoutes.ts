import express from 'express'
import asyncHandler from 'express-async-handler'
import products from '../data/products'

const router = express.Router();

router.get('/api/products', asyncHandler(async (req, res) => {
    res.send(products)
}))

export default router



