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
    .get(productController_1.listProduct);
router.route('/:id')
    .get(productController_1.getProductById)
    .delete(authMiddleware_1.authMiddleware, authMiddleware_1.adminMiddleware, productController_1.deleteProductAsAdmin);
exports.default = router;
