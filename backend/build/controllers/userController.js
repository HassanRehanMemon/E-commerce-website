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
exports.deleteUserAsAdmin = exports.updateUserAsAdmin = exports.getUserByIdAsAdmin = exports.getUsersAsAdmin = exports.getUserProfile = exports.registerUesr = exports.authUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateToken_1 = require("../utils/generateToken");
// LOGIN THE USER
exports.authUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield userModel_1.default.findOne({ email });
    if (user && (yield bcrypt_1.default.compare(password, user.password))) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: (0, generateToken_1.generateToken)(user._id)
        });
    }
    res.status(401);
    throw new Error('User not found');
}));
// REGISTER USER
exports.registerUesr = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const userInDb = yield userModel_1.default.findOne({ email });
    if (userInDb) {
        res.status(400);
        throw new Error('User already exists');
    }
    const user = yield userModel_1.default.create({
        name,
        email,
        password: bcrypt_1.default.hashSync(password, 10)
    });
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: (0, generateToken_1.generateToken)(user._id)
        });
    }
    res.status(400);
    throw new Error('Invalid Data');
}));
exports.getUserProfile = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // res.send('Success')
    const user = yield userModel_1.default.findById(req.body.user._id);
    // console.log('made it');
    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    }
    else {
        res.status(404);
        throw new Error('User not found');
    }
}));
exports.getUsersAsAdmin = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // res.send('Success')
    const users = yield userModel_1.default.find({}).select('-password');
    // console.log('made it');
    if (users) {
        res.status(200).json(users);
    }
    else {
        res.status(404);
        throw new Error('Could not fetch users');
    }
}));
exports.getUserByIdAsAdmin = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // res.send('Success')
    const user = yield userModel_1.default.findById(req.params.id).select('-password');
    // console.log('made it');
    if (user) {
        res.status(200).json(user);
    }
    else {
        res.status(404);
        throw new Error('Could not fetch users');
    }
}));
exports.updateUserAsAdmin = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // res.send('Success')
    const user = yield userModel_1.default.findById(req.params.id);
    // console.log('made it');
    if (user) {
        console.log(req.body.name + " " + req.body.email + " " + req.body.isAdmin);
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (typeof req.body.isAdmin !== "undefined") {
            user.isAdmin = req.body.isAdmin;
            console.log('here');
        }
        const updatedUser = yield user.save();
        res.status(200).json(updatedUser);
    }
    else {
        res.status(404);
        throw new Error('Could not update');
    }
}));
exports.deleteUserAsAdmin = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // res.send('Success')
    const user = yield userModel_1.default.findById(req.params.id);
    // console.log('made it');
    if (user) {
        yield user.delete();
        res.status(200).json({ message: 'User Deleted Successfully' });
    }
    else {
        res.status(404);
        throw new Error('Could not delete');
    }
}));
