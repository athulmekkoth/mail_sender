import redis from "../config/redis";
import moment from "moment";
import { RATE_LIMIT_ALLOWED, RATE_LIMIT_DURATION } from "../services/constant";
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';

interface CustomJwtPayload extends JwtPayload {
    userId: string;
}

export const rateLimiter = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req?.headers?.authorization?.split(' ')[1] ?? '';
    
    // Specify the payload type
    const decodedToken = jwt.verify(authHeader, process.env.ACCESS_TOKEN_SECRET!) as CustomJwtPayload;
    const id = decodedToken.userId;

    if (!id) {
        return res.status(400).json({ error: "User ID is missing" });
    }

    const currentTime = moment().unix();
    const result = await redis.hgetall(id);

    if (Object.keys(result).length === 0) {
        await redis.hset(id, {
            createAt: currentTime.toString(),
            count: "1"
        });
        return next();
    }

    if (result) {
        const difference = currentTime - parseInt(result["createAt"]);
        
        if (difference > RATE_LIMIT_DURATION) {
            await redis.hset(id, {
                createAt: currentTime.toString(),
                count: "1"
            });
            return next();
        }

        if (parseInt(result["count"]) >= RATE_LIMIT_ALLOWED) {
            return res.status(429).json({
                success: false,
                message: "You have exceeded the limit"
            });
        } else {
            await redis.hset(id, {
                count: (parseInt(result["count"]) + 1).toString()
            });
            return next();
        }
    }
};
