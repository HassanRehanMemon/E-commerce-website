import express from 'express'
import asyncHandler from 'express-async-handler'
import { createProductAsAdmin, deleteProductAsAdmin, getProductById, listProduct, updateProductAsAdmin } from '../controllers/productController';
import { adminMiddleware, authMiddleware } from '../middleware/authMiddleware';
import Product from '../models/productModel';

const router = express.Router();

router.route('/')
    .get(listProduct)
    .post(authMiddleware, adminMiddleware, createProductAsAdmin)

router.route('/:id')
    .get(getProductById)
    .put(authMiddleware, adminMiddleware, updateProductAsAdmin)
    .delete(authMiddleware, adminMiddleware, deleteProductAsAdmin)

export default router



