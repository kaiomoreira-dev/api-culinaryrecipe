/* eslint-disable import/no-extraneous-dependencies */

import { createConnection } from "@shared/infra/typeorm";

import { app } from "./app";

import "reflect-metadata";
import "dotenv/config";

createConnection();

app.listen(3333, () => {
  console.log("Server listening on port 3333");
});
