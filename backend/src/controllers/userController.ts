import expressAsyncHandler from "express-async-handler";
import { Response, Request, NextFunction } from "express";
import User from "../models/userModel";
import bcrypt from 'bcrypt'
import { generateToken } from "../utils/generateToken";


// LOGIN THE USER
export const authUser = expressAsyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })
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



export const getUserProfile = expressAsyncHandler(async (req, res) => {
    // res.send('Success')
    const user = await User.findById(req.body.user._id)

    // console.log('made it');
    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})




