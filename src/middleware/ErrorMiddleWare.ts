import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const handelValidationError = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    const errorArray = errors.array().map(err => err.msg)
    if (errorArray.length > 0) {
        res.status(400).json(errorArray)
        return
    }
    next();
}