
import redisClient from "../config/redis";
export const getDataFromRedis = async (key: string) => {
    const cachedData: any = await redisClient.get(key);
    if (cachedData) {
        return JSON.parse(cachedData);
    }
    return null;
};

export const setDataInRedis = async (key: string, data: string, cacheDuration: number) => {
    await redisClient.setex(key, cacheDuration, JSON.stringify(data));
    return;
};


export const invalid = async (key: string) => {
    await redisClient.del("key")
}