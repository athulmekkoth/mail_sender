import express, { Express, NextFunction, Request, Response } from 'express';
import { publishMessage } from '../lib/Emailproducer';

const sendMail=async(req:Request,res:Response,next:NextFunction)=>{
    const data=req.body
 
    if(!data)
    {
        return res.status(404).json({messagge:"error"})
     
    }
    publishMessage(data)
    return res.status(200).json({message:"sucess"})
}
export default sendMail