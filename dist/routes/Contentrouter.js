import { createMail, getMail } from "../controllers/Contentcontroller";
import { Router } from "express";
import { restrictedTo, isAuth } from "../utils/isAuth";
const contentrouter = Router();
contentrouter.post('/create', restrictedTo, createMail);
contentrouter.get('/getall', isAuth, getMail);
export default contentrouter;
