import { NextFunction, Response, Request } from "express"
import jwt from "jsonwebtoken"
import expressAsyncHandler from "express-async-handler"
import User from "../models/userModel"


export const authMiddleware = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    let token
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {

        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.TOKEN_SECRET!)

            req.body.user = await User.findById((<any>decoded).user_id).select('-password')
            next()

        } catch (e: any) {
            res.status(401)
            throw new Error('Auth token not found')

        }
    }

    if (!token) {

        res.status(401)
        throw new Error('Auth token not found')
    }

})