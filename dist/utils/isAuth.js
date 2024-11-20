var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jsonwebtoken from 'jsonwebtoken';
const { verify } = jsonwebtoken;
import { getUser } from './token';
const isAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const tokenCookie = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token;
    console.log(tokenCookie);
    req.user = null;
    if (!tokenCookie) {
        return res.status(500).json({ message: "Login before " });
    }
    try {
        const data = yield getUser(tokenCookie);
        req.user = data;
        return next();
    }
    catch (error) {
        // console.error("Error retrieving user data:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
const restrictedTo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield isAuth(req, res, () => __awaiter(void 0, void 0, void 0, function* () {
            var _b;
            if ((_b = req.user) === null || _b === void 0 ? void 0 : _b.isAdmin) {
                next();
            }
            else {
                return res.status(403).json({ message: "You are not allowed to do that" });
            }
        }));
    }
    catch (error) {
        // console.error("Error in restrictedTo middleware:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
// return (req: Request, res: Response, next: NextFunction) => {
//  
//   }
//
// try {
// //  const token=req.headers.authorization?.split(" ")[1]
// console.log(req.cookies)
//   const refreshToken = req.cookies.refreshToken
// const decodedToken = verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as { userId: string, isAdmin: boolean };
//  const userId = decodedToken.userId;
//  const isAdmin = decodedToken.isAdmin;
//   req.user = { userId, isAdmin };
//   next()
// } catch (error) {
//   console.log(error);
//   res.status(401).json({ message: "You need to login" });
// }
export { isAuth, restrictedTo };
