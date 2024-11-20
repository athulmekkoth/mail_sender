import { PrismaClient } from "@prisma/client";
import { Log } from "../types/log.types";

const prisma = new PrismaClient();

export const createLog = async (logData: Log) => {
    const log = await prisma.logSchema.create({
        data: {
            ...logData

        }
    });

}
export const getLogbyID =async(logId:string)=>{
   try{
    const response = await prisma.logSchema.findUnique({
        where: { logID: logId } 
      })
    if(response){return response}
   }
   catch(err){
    console.log(err)
   }

}
export const deleteLogs=()=>{
    return prisma.logSchema.deleteMany({})
}