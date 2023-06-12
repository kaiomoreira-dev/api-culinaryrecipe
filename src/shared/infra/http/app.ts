/* eslint-disable import/no-extraneous-dependencies */

import "dotenv/config";

import "reflect-metadata";

import "express-async-errors";

import "@shared/container";

import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import swaggerUI from "swagger-ui-express";

import { AppError } from "@shared/errors/AppError";
import { routes } from "@shared/infra/http/routes";

import rateLimiter from "./middlewares/rateLimiter";
import swaggerFile from "./swagger.json";

export const app = express();

app.use(rateLimiter);

app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

if (process.env.NODE_ENV !== "test") {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [
      // enable HTTP calls tracing
      new Sentry.Integrations.Http({ tracing: true }),
      // enable Express.js middleware tracing
      new Tracing.Integrations.Express({ app }),
    ],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
}

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(routes);

// capture erros
app.use(Sentry.Handlers.errorHandler());

app.use(
  Sentry.Handlers.errorHandler({
    shouldHandleError(error) {
      // Capture all 404 and 500 errors
      if (error.status === 429 || error.status === 500) {
        return true;
      }
      return false;
    },
  })
);

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
