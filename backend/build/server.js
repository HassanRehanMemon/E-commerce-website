"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
dotenv_1.default.config();
(0, db_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send('Api is running');
});
app.use('/api/products', productRoutes_1.default);
app.use('/api/users', userRoute_1.default);
app.use('/api/orders', orderRoutes_1.default);
app.use(errorMiddleware_1.notFound);
app.use(errorMiddleware_1.errorHandler);
app.listen(5000, () => {
    console.log('api is running ');
});
