import "dotenv/config";
import { faker } from "@faker-js/faker";
import { Produto } from "@modules/recipe/infra/typeorm/entities/Produto";
import request from "supertest";
import { DataSource } from "typeorm";

import { createConnection } from "@shared/infra/typeorm";

let connection: DataSource;

describe("Create produto Controller", () => {
    beforeAll(async () => {
        connection = await createConnection("localhost");

        await connection.runMigrations();
    });

    afterAll(async () => {
        // dropbase
        await connection.dropDatabase();

        await connection.destroy();
    });
});
