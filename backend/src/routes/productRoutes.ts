import express from 'express'
import asyncHandler from 'express-async-handler'
import products from '../data/products'

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    res.send(products)
}))

router.get('/:id', asyncHandler(async (req, res)=>{
    const id = req.params.id
    const product = products.find((product) => {
        return product._id === id
    })
    res.send(product)

}))

export default router



