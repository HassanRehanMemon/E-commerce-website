"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controllers/productController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.route('/')
    .get(productController_1.listProduct)
    .post(authMiddleware_1.authMiddleware, authMiddleware_1.adminMiddleware, productController_1.createProductAsAdmin);
router.route('/:id')
    .get(productController_1.getProductById)
    .put(authMiddleware_1.authMiddleware, authMiddleware_1.adminMiddleware, productController_1.updateProductAsAdmin)
    .delete(authMiddleware_1.authMiddleware, authMiddleware_1.adminMiddleware, productController_1.deleteProductAsAdmin);
router.route('/:id/review')
    .post(authMiddleware_1.authMiddleware, productController_1.addReview);
exports.default = router;
