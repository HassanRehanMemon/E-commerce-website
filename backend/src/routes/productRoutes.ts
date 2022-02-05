import express from 'express'
import asyncHandler from 'express-async-handler'
import products from '../data/products'
import Product from '../models/productModel';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    // throw new Error('just an error')
    res.send(await Product.find())
}))

router.get('/:id', asyncHandler(async (req, res) => {
    const id = req.params.id
    const product = await Product.findById({ _id: id })
    if (product) {
        res.send(product)

    } else {
        res.status(404).json({
            message: "Product not found"
        })
    }

}))

export default router



