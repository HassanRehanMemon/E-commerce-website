"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.default = [
    {
        name: "Hassan Rehan Memon",
        email: "hr@gmail.com",
        password: bcrypt_1.default.hashSync("hassan789", 10),
        isAdmin: true,
    },
    {
        name: "HR",
        email: "hr1@gmail.com",
        password: bcrypt_1.default.hashSync("hassan789", 10),
    }, {
        name: "Uchiha",
        email: "hr2@gmail.com",
        password: bcrypt_1.default.hashSync("hassan789", 10),
    },
];
