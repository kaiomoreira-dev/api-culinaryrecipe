import "dotenv/config";
import { faker } from "@faker-js/faker";
import request from "supertest";
import { DataSource } from "typeorm";

import { app } from "@shared/infra/http/app";
import { createConnection } from "@shared/infra/typeorm";

let connection: DataSource;

describe("List e-mails Controller", () => {
    beforeAll(async () => {
        connection = await createConnection("localhost");

        await connection.runMigrations();
    });

    afterAll(async () => {
        await connection.dropDatabase();

        await connection.destroy();
    });

    it("should be able to list e-mails", async () => {
        await request(app).post("/email").send({
            id: faker.datatype.uuid(),
            e_mail: faker.internet.email(),
        });

        await request(app).post("/email").send({
            id: faker.datatype.uuid(),
            e_mail: faker.internet.email(),
        });

        await request(app).post("/email").send({
            id: faker.datatype.uuid(),
            e_mail: faker.internet.email(),
        });

        const response = await request(app).get("/email");

        console.log(response.body);

        expect(response.status).toBe(200);
    });
});
