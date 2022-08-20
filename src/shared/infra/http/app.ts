/* eslint-disable import/no-extraneous-dependencies */
import express from "express";

import "@shared/container";

import { routes } from "@shared/infra/http/routes";

export const app = express();

app.use(express.json());

app.use(routes);
