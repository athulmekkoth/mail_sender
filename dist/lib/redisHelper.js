var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import redisClient from "../config/redis";
export const getDataFromRedis = (key) => __awaiter(void 0, void 0, void 0, function* () {
    const cachedData = yield redisClient.get(key);
    if (cachedData) {
        return JSON.parse(cachedData);
    }
    return null;
});
export const setDataInRedis = (key, data, cacheDuration) => __awaiter(void 0, void 0, void 0, function* () {
    yield redisClient.setex(key, cacheDuration, JSON.stringify(data));
    return;
});
export const invalid = (key) => __awaiter(void 0, void 0, void 0, function* () {
    yield redisClient.del("key");
});
