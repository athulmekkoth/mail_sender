import express, { Express, NextFunction, Request, Response } from 'express';
import { PrismaClient } from "@prisma/client";
import bodyParser from 'body-parser';
import UserRouter from './routes/Userroute';
import ContentRouter from './routes/Contentrouter';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import emailRouter from './routes/EmailRoute';
import { connectRabbitMQ } from './config/rabbitMq';
import { logID } from './middleware/LogggerId';
import { logMsg } from './lib/logProducer';
import { checkHealthService } from './services/HealthService';
import swaggerUi from "swagger-ui-express"
import YAML from "yamljs"

const swaggerDocument= YAML.load('./swagger.yml')
console.log(swaggerDocument);
const app: Express = express();
const port = 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173'
}));
app.use('/docs',swaggerUi.serve,swaggerUi.setup(swaggerDocument))
app.use(logID)

app.use("/user", UserRouter);
app.use("/content", ContentRouter)
app.use("/email", emailRouter);

app.get('/healthCheck',checkHealthService)

app.get("/ping",(req:Request,res:Response)=>{
  const logId=req?.logId ?? ','
  logMsg(logId,"this isa log",{test:"ping"})
  res.status(200).json({"logid,PONG":req?.logId})
}
)

app.get("/hai", (req: Request, res: Response) => {
  console.log("Request to /hai endpoint received");
  res.status(200).json({ message: "hai" });
});

const startServer = async () => {
  try {
    await connectRabbitMQ();
    app.listen(port, () => {
      console.log(`Server is successfully running on port ${port}`);
  
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};


startServer();
