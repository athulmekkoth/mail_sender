import { createMail, deleteMail, getMail } from "../controllers/Contentcontroller";
import { Router } from "express";
import { isAuth } from "../utils/isAuth";
import { authMidleWare } from "../middleware/authMiddleWare";
import { checkPermission } from "../middleware/roleMiddleWare";
import { rateLimiter } from "../middleware/rateLimiter";
import { body } from 'express-validator';
import { handelValidationError } from "../middleware/ErrorMiddleWare";
const contentRouter = Router();


const validateMail = [
    body('title').isLength({ min: 5 }).withMessage('Title is required and minimmum 5 characters'),
    
]

contentRouter.post(
    '/create',
    validateMail,
    handelValidationError, authMidleWare,
    rateLimiter,
    checkPermission("create"),
    createMail
);

contentRouter.get('/getall', validateMail, handelValidationError, authMidleWare, getMail);
contentRouter.get('/delete', validateMail, handelValidationError, authMidleWare, deleteMail);

export default contentRouter;
