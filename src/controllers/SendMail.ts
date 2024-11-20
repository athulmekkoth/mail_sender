import express, { Express, NextFunction, Request, Response } from 'express';
import { publishMessage } from '../lib/Emailproducer';

const sendMail=async(req:Request,res:Response,next:NextFunction)=>{
    const data=req.body
 
    if(data)
    {
        publishMessage(data)
       
    }
}
export default sendMail