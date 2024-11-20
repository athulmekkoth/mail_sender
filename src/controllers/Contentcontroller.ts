import express, { Express, NextFunction, Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import  {validationResult} from 'express-validator'
const prisma = new PrismaClient();

export const createMail = async (req: Request, res: Response, next: NextFunction) => {
const errros = validationResult(req)
console.log(errros)
const user =req.user?.id ?? '';

  try {
 
    const { title, content,userId } = req.body
   const result = await prisma.emails.create({
    data: {
      user: {
        connect: { id: user },  
      },
      title: title,
      Content:content
   
    }
  });
   
    // redis.hmset(result.id, {
    //   userId: result.userId,
    //   title: result.title,
    //   Content: result.Content
    // });
 
    res.status(200).json({ message: "mail saved" });
    // redis.hmget(result.id, 'userId', 'title', 'Content', (err, obj) => {
    //   if (err) {
    //     console.error(err);
    //     return;
    //   }
    //   console.log(obj);
    // })
  }
  catch (error: any) {
    console.log("errro happend:",error.message);
  }
}
export const getMail = async (req: Request, res: Response, next: NextFunction) => {
  try {
   

  const result = await prisma.emails.findMany({})
  
   res.status(200).json({ message: result });
  }
  catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
export const deleteMail = async (req: Request, res: Response, next: NextFunction) => {
  try {
   

  const result = await prisma.emails.delete({where:{
    id:req.body.id
  }})
  
   res.status(200).json({ message: result });
  }
  catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}