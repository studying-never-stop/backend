import { Injectable } from '@nestjs/common';

import Redis from "ioredis";

const redis = new Redis({
    host: "localhost",
    name: "library",
    port: 6379,
    db: 0,
});

// 连接成功后执行的回调函数
redis.on("connect", () => {
    console.log("Redis connected!");
});

// 连接出错时执行的回调函数
redis.on("error", (error) => {
    console.error("Redis error: ", error);
});


@Injectable()
export class RedisService {
    async set(k,v) {
        return await redis.set(k,v)
    }
    
    /**
     *不建议使用
     * @deprecated
     * @returns 
     */
    getRedis() {
        return redis
    }

}




