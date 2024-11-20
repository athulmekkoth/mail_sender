import jwt from 'jsonwebtoken';
import 'dotenv/config';
import express, { Express, NextFunction, Request, Response } from 'express';

type User = {
    userId: string,
    role: string
}
const createToken = (userId: string,role:string) => {
 
    const token =jwt.sign({ userId: userId, role:role}, process.env.ACCESS_TOKEN_SECRET!, {});
    return token;

}
const getUser=(token:string|null)=>{

}
export{createToken,getUser}