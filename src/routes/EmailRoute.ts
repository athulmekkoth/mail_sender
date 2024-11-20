import  express  from "express";
import sendMail from "../controllers/SendMail";
import { authMidleWare } from "../middleware/authMiddleWare";
import { rateLimiter } from "../middleware/rateLimiter";
const emailRouter=express.Router()

emailRouter.post("/send",authMidleWare,rateLimiter,sendMail)

export default emailRouter