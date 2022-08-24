/* eslint-disable import/no-extraneous-dependencies */
import express, { NextFunction, Request, Response } from "express";

import "@shared/container";

import "express-async-errors";

import { AppError } from "@shared/errors/AppError";
import { routes } from "@shared/infra/http/routes";

export const app = express();

app.use(express.json());

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
