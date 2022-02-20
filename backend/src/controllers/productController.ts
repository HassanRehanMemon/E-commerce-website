import expressAsyncHandler from 'express-async-handler'
import Product from '../models/productModel'
import { Response, Request } from 'express'

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
      message: 'Product not found'
    })
  }
})

export const deleteProductAsAdmin = expressAsyncHandler(async (req, res) => {
  // res.send('Success')
  const product = await Product.findById(req.params.id)

  // console.log('made it');
  if (product) {
    await product.delete()
    res.status(200).json({ message: 'Product Deleted Successfully' })
  } else {
    res.status(404)
    throw new Error('Could not delete')
  }
})

export const createProductAsAdmin = expressAsyncHandler(async (req, res) => {
  const product = await Product.create({
    name: 'Sample name',
    price: 0,
    user: req.body.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description'
  })

  // console.log('made it');
  if (product) {
    // await product.delete()
    res.status(200).json(product)
  } else {
    res.status(404)
    throw new Error('Could not delete')
  }
})

export const updateProductAsAdmin = expressAsyncHandler(async (req, res) => {
  // res.send('Success')
  const product = await Product.findById(req.params.id)
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock
  } = req.body

  // console.log('image' , req.file)

  console.log(product)
  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Could not update product')
  }
})

export const addReview = expressAsyncHandler(async (req, res) => {
  // res.send('Success')
  const product = await Product.findById(req.params.id)
  const {
    rating, comment
  } = req.body

  // console.log('image' , req.file)

  // console.log(product)
  if (product) {
    // check if already reviewd
    const reviewd = product.reviews.find((review: any) =>
      review.user.toString() === req.body.user._id.toString()
    )
    if (reviewd) {
      res.status(404)
      throw new Error('Already reviewd')
    }

    product.reviews.push({
      name: req.body.user.name,
      rating,
      comment,
      user: req.body.user._id
    })
    product.numReviews = product.reviews.length
    product.rating = product.reviews.reduce((acc: any, review: { rating: any }) =>
      acc + review.rating, 0
    ) / product.reviews.length
    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Could not update product')
  }
})
