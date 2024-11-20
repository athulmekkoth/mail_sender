var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import { PrismaClient } from "@prisma/client";
import bodyParser from 'body-parser';
import UserRouter from './routes/Userroute';
import ContentRouter from './routes/Contentrouter';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import startConsumer from './rabbitMQ/consumer';
import emailRouter from './routes/EmailRoute';
import { connectRabbitMQ } from './config/rabbitMq';
import { logID } from './middleware/LogggerId';
import { logMsg } from './lib/logProducer';
const app = express();
const port = 3000;
const prisma = new PrismaClient();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));
app.use("/user", UserRouter);
app.use("/content", ContentRouter);
app.use("/email", emailRouter);
app.use(logID);
app.get("/ping", (req, res) => {
    var _a;
    const logId = (_a = req === null || req === void 0 ? void 0 : req.logId) !== null && _a !== void 0 ? _a : ',';
    logMsg(logId, "this isa log", { test: "ping" });
    res.status(200).json({ "logid": req === null || req === void 0 ? void 0 : req.logId });
});
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connectRabbitMQ();
        app.listen(port, () => {
            console.log(`Server is successfully running on port ${port}`);
            startConsumer();
        });
    }
    catch (error) {
        console.error("Error starting server:", error);
    }
});
startServer();
