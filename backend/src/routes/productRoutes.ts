import express from 'express'
import asyncHandler from 'express-async-handler'
import { deleteProductAsAdmin, getProductById, listProduct } from '../controllers/productController';
import { adminMiddleware, authMiddleware } from '../middleware/authMiddleware';
import Product from '../models/productModel';

const router = express.Router();

router.route('/')
    .get(listProduct)

router.route('/:id')
    .get(getProductById)
    .delete(authMiddleware, adminMiddleware, deleteProductAsAdmin)

export default router



