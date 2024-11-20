var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export const createMail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const result = yield prisma.emails.create({
            data: {
                userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId,
                title: req.body.title,
                Content: req.body.content
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
    catch (error) {
        console.log("errro happend:", error.message);
    }
});
export const getMail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma.emails.findMany({});
        res.status(200).json({ message: result });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
export const deleteMail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma.emails.delete({ where: {
                id: req.body.id
            } });
        res.status(200).json({ message: result });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
