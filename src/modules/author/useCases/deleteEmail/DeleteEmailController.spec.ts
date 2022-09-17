import "dotenv/config";
import { faker } from "@faker-js/faker";
import { Author } from "@modules/author/infra/typeorm/entities/Author";
import { Email } from "@modules/author/infra/typeorm/entities/Email";
import request from "supertest";
import { DataSource } from "typeorm";

import { app } from "@shared/infra/http/app";
import { createConnection } from "@shared/infra/typeorm";

let connection: DataSource;

describe("Delete e-mail Controller", () => {
    beforeAll(async () => {
        connection = await createConnection("localhost");

        await connection.runMigrations();
    });

    afterAll(async () => {
        await connection.dropDatabase();

        await connection.destroy();
    });

    it("should be able to delete a e-mail by id", async () => {
        const responseAuthor = await request(app).post("/author").send({
            id: faker.datatype.uuid(),
            name: faker.name.fullName(),
            whatsapp: faker.phone.number(),
        });

        const author = responseAuthor.body as Author;

        const responseCreateEmail = await request(app).post("/email").send({
            id: faker.datatype.uuid(),
            e_mail: faker.internet.email(),
            author_id: author.id,
        });

        const { id } = responseCreateEmail.body as Email;

        const responseDeleteEmail = await request(app)
            .delete(`/email/${id}`)
            .send();

        expect(responseDeleteEmail.statusCode).toBe(200);
    });

    it("should not be to delete email with invalid id", async () => {
        const id = "f060c7bc-4539-4bd8-a3ac-f4b7d98f54d6";

        const responseDeleteEmail = await request(app)
            .delete(`/email/${id}`)
            .send();

        expect(responseDeleteEmail.statusCode).toBe(404);
    });
});
