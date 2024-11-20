import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { isAuth } from "../utils/isAuth";
type User = {
    userId: string,
    isAdmin: boolean
}
export const authMidleWare = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req?.headers?.authorization ?? '';
        if (!authHeader || authHeader === '' || !authHeader.startsWith('Bearer')) {
            return res.status(401).json({ message: "not authorized to acces this resource" })

        }
        const token = authHeader.split(' ')[1]
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as User
        const userId = decodedToken?.userId ?? '';
        if (!userId) {
            return res.status(401).json({ message: "not authorized to acces this resource" })
        }
        const user=await isAuth(userId)
        
        req.user=user
        next()
    }
    catch (error) {
        return res.status(401).json({ message: "not authorized to acces this resource" })
    }
}