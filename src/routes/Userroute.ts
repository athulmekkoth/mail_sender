import express, { Express, Request, Response } from 'express';
import {UserRegister,UserLogin,UserRefreshToken, UserLogout, Userdelete} from '../controllers/Usercontrollers';

const UserRouter = express.Router();
UserRouter.post('/register', UserRegister);
UserRouter.post('/login', UserLogin);
// UserRouter.post('/protect', protectedRoute);
UserRouter.post('/refresh', UserRefreshToken);
UserRouter.post('/logout', UserLogout);
UserRouter.delete('/delete', Userdelete);
export default UserRouter;

