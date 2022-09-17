import "dotenv/config";
import { faker } from "@faker-js/faker";
import request from "supertest";
import { DataSource } from "typeorm";

import { app } from "@shared/infra/http/app";
import { createConnection } from "@shared/infra/typeorm";

let connection: DataSource;

describe("Create author Controller", () => {
    beforeAll(async () => {
        connection = await createConnection("localhost");

        await connection.runMigrations();
    });

    afterAll(async () => {
        await connection.dropDatabase();

        await connection.destroy();
    });

    it("should be able to create author", async () => {
        const responseAuthor = await request(app).post("/author").send({
            id: faker.datatype.uuid(),
            name: "Kaio Moreira",
            whatsapp: faker.phone.number(),
        });

        expect(responseAuthor.status).toBe(201);
    });

    it("should not be able to create author already exists", async () => {
        await request(app).post("/author").send({
            id: faker.datatype.uuid(),
            name: "Kaio Moreira",
            whatsapp: faker.phone.number(),
        });

        const responseAuthor = await request(app).post("/author").send({
            id: faker.datatype.uuid(),
            name: "Kaio Moreira",
            whatsapp: faker.phone.number(),
        });

        expect(responseAuthor.status).toBe(401);
    });

    it("should not be able to create author with Whatsapp already exists", async () => {
        await request(app).post("/author").send({
            id: faker.datatype.uuid(),
            name: "Kaio",
            whatsapp: "1785236547",
        });

        const responseAuthor = await request(app).post("/author").send({
            id: faker.datatype.uuid(),
            name: "Rilary",
            whatsapp: "1785236547",
        });

        expect(responseAuthor.status).toBe(401);
    });
});
