import express, { Express, Request, Response } from 'express';
import { body } from 'express-validator';
import { 
  UserRegister, 
  UserLogin, 
  UserRefreshToken, 
  UserLogout, 
  Userdelete 
} from '../controllers/Usercontrollers';
import { handelValidationError } from "../middleware/ErrorMiddleWare";

const UserRouter = express.Router();


const validateRegister = [
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

const validateLogin = [
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

const validateRefreshToken = [
  body('refreshToken').notEmpty().withMessage('Refresh token is required')
];

const validateDelete = [
  body('userId').notEmpty().withMessage('User ID is required')
];


UserRouter.post('/register', validateRegister, handelValidationError, UserRegister);
UserRouter.post('/login', validateLogin, handelValidationError, UserLogin);
UserRouter.post('/refresh', validateRefreshToken, handelValidationError, UserRefreshToken);
UserRouter.post('/logout', UserLogout);  
UserRouter.delete('/delete', validateDelete, handelValidationError, Userdelete);

export default UserRouter;
