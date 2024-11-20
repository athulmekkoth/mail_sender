import express from "express";
import sendMail from "../controllers/SendMail";
const emailRouter = express.Router();
emailRouter.post("/send", sendMail);
export default emailRouter;
