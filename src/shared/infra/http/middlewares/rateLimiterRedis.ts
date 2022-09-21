// import { NextFunction, Request, Response } from "express";
// import { RateLimiterRedis } from "rate-limiter-flexible";
// import { createClient } from "redis";

// import { AppError } from "@shared/errors/AppError";

// const redisClient = createClient({ url: process.env.REDIS_URL });
// const redisConnect = redisClient.connect();
// const limiter = new RateLimiterRedis({
//   storeClient: redisConnect,
//   keyPrefix: "rateLimiter",
//   points: 8, // 10 requests
//   duration: 5, // per 1 second by IP
// });

// export default async function rateLimiter(
//   request: Request,
//   response: Response,
//   next: NextFunction
// ): Promise<void> {
//   try {
//     await limiter.consume(request.ip);

//     return next();
//   } catch (err) {
//     throw new AppError("To many Requests not permited", 429);
//   }
// }
