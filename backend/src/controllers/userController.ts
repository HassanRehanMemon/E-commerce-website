import expressAsyncHandler from "express-async-handler";
import { Response, Request, NextFunction } from "express";
import User from "../models/userModel";
import bcrypt from 'bcrypt'
import { generateToken } from "../utils/generateToken";


export const authUser = expressAsyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body
    console.log(req.body);

    const user = await User.findOne({ email })
    console.log(user);
    if (user && await bcrypt.compare(password, user.password)) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })

    }

    res.status(401)
    throw new Error('User not found')


})





