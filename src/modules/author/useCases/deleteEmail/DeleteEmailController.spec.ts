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

    it("should be able to delete an e-mail", async () => {
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

        const { e_mail } = responseCreateEmail.body as Email;

        const responseDeleteEmail = await request(app)
            .delete("/email/delete")
            .send({
                e_mail,
            });

        expect(responseDeleteEmail.statusCode).toBe(200);
    });

    it("should not be to delete email with invalid email", async () => {
        const e_mail = "fake-email@fake.com";

        const responseDeleteEmail = await request(app)
            .delete("/email/delete")
            .send({
                e_mail,
            });

        expect(responseDeleteEmail.statusCode).toBe(404);
    });
});
