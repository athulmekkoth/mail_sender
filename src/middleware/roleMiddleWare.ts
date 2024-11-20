import { Request, Response, NextFunction } from "express";

type UserRole = 'user' | 'admin';
type Roles = {
    [key in UserRole]: string[];
};

// type Roles= {
//     user: string[];
//     admin: string[];
// };

const rolePermission:  Roles = {
    user: ['read', 'delete', 'update', 'create'],
    admin: ['read', 'delete', 'update', 'create', 'deleteall']
};

export const checkPermission = (requiredPermission: string) => (req: Request, res: Response, next: NextFunction) => {
    const userRole: string = req?.user?.role ?? '';
   console.log("hai",userRole)
if(rolePermission[userRole?.toLowerCase()].includes(requiredPermission.toLowerCase()))
{
    return next()
}
    return res.status(403).json({ message: "Forbidden: You do not have the required permissions." });
};
