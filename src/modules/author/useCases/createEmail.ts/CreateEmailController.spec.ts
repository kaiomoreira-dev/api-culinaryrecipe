import "dotenv/config";
import { faker } from "@faker-js/faker";
import request from "supertest";
import { DataSource } from "typeorm";

import { app } from "@shared/infra/http/app";
import { createConnection } from "@shared/infra/typeorm";

let connection: DataSource;

describe("Create Email Controller", () => {
    beforeAll(async () => {
        connection = await createConnection("localhost");

        await connection.runMigrations();
    });

    afterAll(async () => {
        await connection.dropDatabase();

        await connection.destroy();
    });

    it("should be able to create a new email", async () => {
        const response = await request(app).post("/email").send({
            id: faker.datatype.uuid(),
            e_mail: faker.internet.email(),
        });

        console.log(response.body);

        expect(response.status).toEqual(200);
    });

    it("should not be able to create a new email with same", async () => {
        await request(app).post("/email").send({
            id: faker.datatype.uuid(),
            e_mail: "test@test.com",
        });

        const response = await request(app).post("/email").send({
            id: faker.datatype.uuid(),
            e_mail: "test@test.com",
        });

        expect(response.status).toBe(401);
    });
});
