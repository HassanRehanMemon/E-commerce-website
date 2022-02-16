import expressAsyncHandler from "express-async-handler"
import Product from "../models/productModel"
import { Response, Request } from "express";



export const listProduct = expressAsyncHandler(async (req: Request, res: Response) => {
    // throw new Error('just an error')
    res.send(await Product.find())
})


export const getProductById = expressAsyncHandler(async (req, res) => {
    const id = req.params.id
    const product = await Product.findById({ _id: id })
    if (product) {
        // throw new Error('just an error')
        res.send(product)

    } else {
        res.status(404).json({
            message: "Product not found"
        })
    }

})



export const deleteProductAsAdmin = expressAsyncHandler(async (req, res) => {
    // res.send('Success')
    const product = await Product.findById(req.params.id)

    // console.log('made it');
    if (product) {
        await product.delete()
        res.status(200).json({message: 'Product Deleted Successfully'})
    } else {
        res.status(404)
        throw new Error('Could not delete')
    }
})