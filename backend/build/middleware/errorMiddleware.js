"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFound = void 0;
const errorHandler = (error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? null : res.stack,
    });
};
exports.errorHandler = errorHandler;
const notFound = (req, res, next) => {
    const err = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(err);
};
exports.notFound = notFound;
