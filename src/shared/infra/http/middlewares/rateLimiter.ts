import { NextFunction, Request, Response } from "express";
import { RateLimiterRedis } from "rate-limiter-flexible";
import { createClient } from "redis";

import { AppError } from "@shared/errors/AppError";

export const redisClient = createClient({
  host: process.env.NODE_ENV === "test" ? "localhost" : process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASS || undefined,
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "rateLimiter",
  points: 8, // 10 requests
  duration: 5, // per 1 second by IP
});

export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  try {
    // validação p/ verificar se a variavel
    // de ambiente é localhost e nao test
    if (process.env.NODE_ENV !== "test") {
      await limiter.consume(request.ip);
    }

    return next();
  } catch (err) {
    throw new AppError("To many Requests not permited", 429);
  }
}
