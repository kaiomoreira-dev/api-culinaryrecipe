import "dotenv/config";
import { faker } from "@faker-js/faker";
import { Produto } from "@modules/recipe/infra/typeorm/entities/Produto";
import request from "supertest";
import { DataSource } from "typeorm";

let connection: DataSource;

describe("Create produto Controller", () => {});
