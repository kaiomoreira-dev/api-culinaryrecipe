import "dotenv/config";
import { faker } from "@faker-js/faker";
import { Author } from "@modules/author/infra/typeorm/entities/Author";
import request from "supertest";
import { DataSource } from "typeorm";

import { app } from "@shared/infra/http/app";
import { createConnection } from "@shared/infra/typeorm";

let connection: DataSource;

describe("Create e-mail Controller", () => {
    beforeAll(async () => {
        connection = await createConnection("localhost");

        await connection.runMigrations();
    });

    afterAll(async () => {
        await connection.dropDatabase();

        await connection.destroy();
    });

    it("should be able to create a new email", async () => {
        const responseAuthor = await request(app).post("/author").send({
            id: faker.datatype.uuid(),
            name: faker.name.fullName(),
            whatsapp: faker.phone.number(),
        });

        const author = responseAuthor.body as Author;

        const response = await request(app).post("/email").send({
            id: faker.datatype.uuid(),
            e_mail: faker.internet.email(),
            author_name: author.name,
        });

        expect(response.status).toEqual(200);
    });

    it("should not be able to create a new email with same", async () => {
        const responseAuthor = await request(app).post("/author").send({
            id: faker.datatype.uuid(),
            name: faker.name.fullName(),
            whatsapp: faker.phone.number(),
        });

        const author = responseAuthor.body as Author;

        await request(app).post("/email").send({
            id: faker.datatype.uuid(),
            e_mail: "test@test.com",
            author_name: author.name,
        });

        const response = await request(app).post("/email").send({
            id: faker.datatype.uuid(),
            e_mail: "test@test.com",
            author_name: author.name,
        });

        expect(response.status).toBe(401);
    });

    it("should not be able to create a new email with author name not found", async () => {
        const response = await request(app).post("/email").send({
            id: faker.datatype.uuid(),
            e_mail: "test@test.com",
            author_name: faker.name.fullName(),
        });

        expect(response.status).toBe(404);
    });
});
