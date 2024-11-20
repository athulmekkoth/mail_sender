import jsonwebtoken from 'jsonwebtoken';
const { verify } = jsonwebtoken;
import { getUser } from './token';
import { NextFunction, Request, Response } from "express";
import { compareSync } from 'bcrypt';
import { PrismaClient } from '@prisma/client';
const prisma=new PrismaClient()
interface DecodedToken {
  userId: string;
  isAdmin: boolean;
}

const isAuth = async (userId: string) => {
  if (!userId) {
    return null;
  }

  try {
    const data = await prisma.user.findUnique({
      where: { id: userId },
    });

    return data ? data : null;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

// const isAuth = async (req: Request, res: Response, next: NextFunction): Promise<any> => {

//   const tokenCookie = req.cookies?.token;
// console.log(tokenCookie)
//   req.user = null;

//   if (!tokenCookie) {
//     return res.status(500).json({ message: "Login before " });
//   }

//   try {
//     const data = await getUser(tokenCookie);
    
//     req.user = data;
//     return next();
//   } catch (error) {
//     // console.error("Error retrieving user data:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

// const restrictedTo = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
//   try {
//  const isAdmin = req.user?.isAdmin
//  if(isAdmin)
//  {
//   r
//  }
//   } catch (error) {
//     // console.error("Error in restrictedTo middleware:", error);
//    return res.status(500).json({ message: "Internal server error" });
//   }
// };



// export  {isAuth,restrictedTo}




export  {isAuth}
