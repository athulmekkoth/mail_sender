// export logId=async((req: Request, res: Response, next: NextFunction) => {
//     req.logId = uuidv4();
//     next();
//   });
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
export const logID = (req: Request, res: Response, next: NextFunction) => {
    req.logId = uuidv4(); 
    next();
};
