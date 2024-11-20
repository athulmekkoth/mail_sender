import { PrismaClient } from "@prisma/client"
import Redis from "ioredis"
import amqp from "amqplib";
import { NextFunction, Request, Response } from "express";
export const checkHealthService = async (req: Request, res: Response, next: NextFunction) => {
    const prsima = new PrismaClient()

    const healthStatus = {
        Postgres: "UNKNOWN",
        redis: "UNKNOWN",
        rabbitmq: "UNKNOWN"
    }
    let overallHealth = 200
    try {
        await prsima.$connect()
        healthStatus.Postgres = "OK"
    }
    catch (err) {
        healthStatus.Postgres = "Database Error"
        overallHealth = 503

    }
    try {
        const redis = new Redis({
            host: process.env.REDIS_HOST,
            port: 6379,
        })
        const ping = await redis.ping()
        if (ping === "PONG") {
            healthStatus.redis = "OK"
        }
        else {
            healthStatus.redis = "Redis Down"
            overallHealth = 503
        }
    }
    catch (err) {
        healthStatus.redis = "Redis Error"
        overallHealth = 503

    }

    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URI!)
        healthStatus.rabbitmq = "OK"
        await connection.close()
    }
    catch (err) {
        healthStatus.rabbitmq = "RabbitMQ Error"
        overallHealth = 503

    }
    res.status(overallHealth).json(healthStatus)

}