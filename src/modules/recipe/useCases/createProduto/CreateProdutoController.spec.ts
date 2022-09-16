import "dotenv/config";
import { faker } from "@faker-js/faker";
import request from "supertest";
import { DataSource } from "typeorm";

import { app } from "@shared/infra/http/app";
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

    it("should be able to create produto", async () => {
        const produto1 = await request(app)
            .post("/produto")
            .send({
                id: faker.datatype.uuid(),
                name: "Alho",
                description: faker.lorem.words(20),
            });

        expect(produto1.status).toBe(200);
    });

    it("should be able to create produto already exists", async () => {
        await request(app)
            .post("/produto")
            .send({
                id: faker.datatype.uuid(),
                name: "Alho",
                description: faker.lorem.words(20),
            });

        const produto2 = await request(app)
            .post("/produto")
            .send({
                id: faker.datatype.uuid(),
                name: "Alho",
                description: faker.lorem.words(20),
            });

        expect(produto2.status).toBe(401);
    });
});
