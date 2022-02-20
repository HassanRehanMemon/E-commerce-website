import express from 'express'
import multer from 'multer'
import path from 'path'
import { addReview, createProductAsAdmin, deleteProductAsAdmin, getProductById, listProduct, updateProductAsAdmin } from '../controllers/productController'
import { adminMiddleware, authMiddleware } from '../middleware/authMiddleware'

const router = express.Router()

router.route('/')
  .get(listProduct)
  .post(authMiddleware, adminMiddleware, createProductAsAdmin)

router.route('/:id')
  .get(getProductById)
  .put(authMiddleware, adminMiddleware, updateProductAsAdmin)
  .delete(authMiddleware, adminMiddleware, deleteProductAsAdmin)

router.route('/:id/review')
  .post(authMiddleware, addReview)

export default router
