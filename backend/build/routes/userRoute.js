"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.route('/')
    .post(userController_1.registerUesr)
    .get(authMiddleware_1.authMiddleware, authMiddleware_1.adminMiddleware, userController_1.getUsersAsAdmin);
router.post('/login', userController_1.authUser);
router.route('/profile').get(authMiddleware_1.authMiddleware, userController_1.getUserProfile);
router.route('/:id')
    .get(authMiddleware_1.authMiddleware, authMiddleware_1.adminMiddleware, userController_1.getUserByIdAsAdmin)
    .put(authMiddleware_1.authMiddleware, authMiddleware_1.adminMiddleware, userController_1.updateUserAsAdmin)
    .delete(authMiddleware_1.authMiddleware, authMiddleware_1.adminMiddleware, userController_1.deleteUserAsAdmin);
exports.default = router;
