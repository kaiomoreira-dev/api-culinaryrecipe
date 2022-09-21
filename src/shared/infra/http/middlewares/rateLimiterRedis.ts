import { NextFunction, Request, Response } from "express";
import { RateLimiterRedis } from "rate-limiter-flexible";
import redis from "redis";

import { AppError } from "@shared/errors/AppError";

const redisClient = redis.createClient({ url: process.env.REDIS_URL });

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
    await limiter.consume(request.ip);

    return next();
  } catch (err) {
    throw new AppError("To many Requests not permited", 429);
  }
}
