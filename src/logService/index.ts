import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv"
dotenv.config()
import { LOG_DB_NAME } from "../Constants";
import { getLogbyID } from "../controllers/Logcontroller";
import { startLogConsumer } from "../lib/logConsumer";
import { PrismaClient } from "@prisma/client";
import { deleteCron } from "./deleteCron";
const prisma = new PrismaClient()
startLogConsumer().catch(err => console.log("error in consuming log"))

const app = express()

const PORT = process.env.LOG_PORT || 8081
app.get("/log/:logId", async (req: Request, res: Response, next: NextFunction) => {
 const results = req?.params.logId
 const result=await prisma.logSchema.findUnique({where:{logID:results}})
 if(!result){
    res.status(404).json({message:"logID not found"})
    return 
 }
 res.status(200).json(result)
})

app.listen(PORT, () => {
    deleteCron()
    console.log(`log server is runnign on port${PORT}`)
}) 