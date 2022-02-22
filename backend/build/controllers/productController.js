"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addReview = exports.updateProductAsAdmin = exports.createProductAsAdmin = exports.deleteProductAsAdmin = exports.getProductById = exports.listProduct = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const productModel_1 = __importDefault(require("../models/productModel"));
exports.listProduct = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const keyword = req.query.keyword ?
        {
            name: {
                $regex: req.query.keyword,
                $options: 'i', // for case insensitive
            }
        } : {};
    // throw new Error('just an error')
    res.send(yield productModel_1.default.find(Object.assign({}, keyword)));
}));
exports.getProductById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const product = yield productModel_1.default.findById({ _id: id });
    if (product) {
        // throw new Error('just an error')
        res.send(product);
    }
    else {
        res.status(404).json({
            message: 'Product not found'
        });
    }
}));
exports.deleteProductAsAdmin = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // res.send('Success')
    const product = yield productModel_1.default.findById(req.params.id);
    // console.log('made it');
    if (product) {
        yield product.delete();
        res.status(200).json({ message: 'Product Deleted Successfully' });
    }
    else {
        res.status(404);
        throw new Error('Could not delete');
    }
}));
exports.createProductAsAdmin = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield productModel_1.default.create({
        name: 'Sample name',
        price: 0,
        user: req.body.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description'
    });
    // console.log('made it');
    if (product) {
        // await product.delete()
        res.status(200).json(product);
    }
    else {
        res.status(404);
        throw new Error('Could not delete');
    }
}));
exports.updateProductAsAdmin = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // res.send('Success')
    const product = yield productModel_1.default.findById(req.params.id);
    const { name, price, description, image, brand, category, countInStock } = req.body;
    // console.log('image' , req.file)
    console.log(product);
    if (product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;
        const updatedProduct = yield product.save();
        res.json(updatedProduct);
    }
    else {
        res.status(404);
        throw new Error('Could not update product');
    }
}));
exports.addReview = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // res.send('Success')
    const product = yield productModel_1.default.findById(req.params.id);
    const { rating, comment } = req.body;
    // console.log('image' , req.file)
    // console.log(product)
    if (product) {
        // check if already reviewd
        const reviewd = product.reviews.find((review) => review.user.toString() === req.body.user._id.toString());
        if (reviewd) {
            res.status(404);
            throw new Error('Already reviewd');
        }
        product.reviews.push({
            name: req.body.user.name,
            rating,
            comment,
            user: req.body.user._id
        });
        product.numReviews = product.reviews.length;
        product.rating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length;
        const updatedProduct = yield product.save();
        res.json(updatedProduct);
    }
    else {
        res.status(404);
        throw new Error('Could not update product');
    }
}));
