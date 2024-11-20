

import Redis, { Redis as RedisType } from "ioredis";
import { error } from "winston";

const redis: RedisType = new Redis({
    host:process.env.REDIS_HOST,
//   port:process.env.REDIS_PORT,
    port: 6379,
});
redis.on('error',(err)=>{
    console.log('error',err)
})
export default redis;
