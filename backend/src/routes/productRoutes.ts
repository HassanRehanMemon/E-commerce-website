import express from 'express'
import { addReview, createProductAsAdmin, deleteProductAsAdmin, getProductById, getTopThree, listProduct, updateProductAsAdmin } from '../controllers/productController'
import { adminMiddleware, authMiddleware } from '../middleware/authMiddleware'

const router = express.Router()

router.route('/')
  .get(listProduct)
  .post(authMiddleware, adminMiddleware, createProductAsAdmin)
  
router.route('/topThree')
  .get(getTopThree)

router.route('/:id')
  .get(getProductById)
  .put(authMiddleware, adminMiddleware, updateProductAsAdmin)
  .delete(authMiddleware, adminMiddleware, deleteProductAsAdmin)

router.route('/:id/review')
  .post(authMiddleware, addReview)

export default router
