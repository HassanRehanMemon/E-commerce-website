import express from 'express'
import multer from 'multer'
import path from 'path'
import { addReview, createProductAsAdmin, deleteProductAsAdmin, getProductById, listProduct, updateProductAsAdmin } from '../controllers/productController'
import { adminMiddleware, authMiddleware } from '../middleware/authMiddleware'

const router = express.Router()

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(
      null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  }
})

function checkFileType (file: Express.Multer.File, cb: any) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  console.log('whatever asdfa----------')

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Images only!')
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  }
})

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
