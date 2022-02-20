'use strict'
const __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { default: mod }
}
Object.defineProperty(exports, '__esModule', { value: true })
const express_1 = __importDefault(require('express'))
const multer_1 = __importDefault(require('multer'))
const path_1 = __importDefault(require('path'))
const productController_1 = require('../controllers/productController')
const authMiddleware_1 = require('../middleware/authMiddleware')
const router = express_1.default.Router()
const storage = multer_1.default.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path_1.default.extname(file.originalname)}`)
  }
})
function checkFileType (file, cb) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path_1.default.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)
  console.log('whatever asdfa----------')
  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Images only!')
  }
}
const upload = (0, multer_1.default)({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  }
})
router.route('/')
  .get(productController_1.listProduct)
  .post(authMiddleware_1.authMiddleware, authMiddleware_1.adminMiddleware, productController_1.createProductAsAdmin)
router.route('/:id')
  .get(productController_1.getProductById)
  .put(authMiddleware_1.authMiddleware, authMiddleware_1.adminMiddleware, productController_1.updateProductAsAdmin)
  .delete(authMiddleware_1.authMiddleware, authMiddleware_1.adminMiddleware, productController_1.deleteProductAsAdmin)
router.route('/:id/review')
  .post(authMiddleware_1.authMiddleware, productController_1.addReview)
exports.default = router
