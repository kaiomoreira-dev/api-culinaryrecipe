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
        const responseCreateAuthor = await request(app).post("/author").send({
            id: faker.datatype.uuid(),
            name: faker.name.fullName(),
            whatsapp: faker.phone.number(),
        });

        const { id } = responseCreateAuthor.body as Author;

        const responseCreateEmail = await request(app).post("/email").send({
            id: faker.datatype.uuid(),
            e_mail: faker.internet.email(),
            author_id: id,
        });

        expect(responseCreateEmail.status).toEqual(201);
    });

    it("should not be able to create a new email with same", async () => {
        const responseCreateAuthor1 = await request(app).post("/author").send({
            id: faker.datatype.uuid(),
            name: faker.name.fullName(),
            whatsapp: faker.phone.number(),
        });

        const { id: authorId1 } = responseCreateAuthor1.body as Author;

        const responseCreateAuthor2 = await request(app).post("/author").send({
            id: faker.datatype.uuid(),
            name: faker.name.fullName(),
            whatsapp: faker.phone.number(),
        });

        const { id: authorId2 } = responseCreateAuthor2.body as Author;

        await request(app).post("/email").send({
            id: faker.datatype.uuid(),
            e_mail: "test@test.com",
            author_id: authorId1,
        });

        const responseCreateEmail = await request(app).post("/email").send({
            id: faker.datatype.uuid(),
            e_mail: "test@test.com",
            author_id: authorId2,
        });

        expect(responseCreateEmail.status).toBe(401);
    });

    it("should not be able to create a new email with author_id invalid", async () => {
        const fakerAuthorId = "f060c7bc-4539-4bd8-a3ac-f4b7d98f54d6";

        const responseCreateEmail = await request(app).post("/email").send({
            id: faker.datatype.uuid(),
            e_mail: faker.internet.email(),
            author_id: fakerAuthorId,
        });
        expect(responseCreateEmail.status).toBe(404);
    });
});
