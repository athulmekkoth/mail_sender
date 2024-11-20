import Redis from "ioredis";
const redis = new Redis({
    host: process.env.REDIS_HOST,
    //   port:process.env.REDIS_PORT,
    port: 6379,
});
redis.on('error', (err) => {
    console.log('error', err);
});
export default redis;
