/* eslint-disable import/no-extraneous-dependencies */
import express, { NextFunction, Request, Response } from "express";

import "dotenv/config";

import "reflect-metadata";

import cors from "cors";

import "express-async-errors";

import "@shared/container";

import swaggerUI from "swagger-ui-express";

import { AppError } from "@shared/errors/AppError";
import { routes } from "@shared/infra/http/routes";

// import rateLimiter from "./middlewares/rateLimiterRedis";
import swaggerFile from "./swagger.json";

export const app = express();

// app.use(rateLimiter);

app.use(express.json());

app.use(cors());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use(routes);
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }
    return response.status(500).json({
      status: "error",
      message: `Internal server - error: ${err.message}`,
    });
  }
);
