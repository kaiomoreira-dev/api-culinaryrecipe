import "dotenv/config";
import { faker } from "@faker-js/faker";
import { Author } from "@modules/author/infra/typeorm/entities/Author";
import { Email } from "@modules/author/infra/typeorm/entities/Email";
import request from "supertest";
import { DataSource } from "typeorm";

import { app } from "@shared/infra/http/app";
import { createConnection } from "@shared/infra/typeorm";

let connection: DataSource;

describe("Update e-mail Controller", () => {
    beforeAll(async () => {
        connection = await createConnection("localhost");

        await connection.runMigrations();
    });

    afterAll(async () => {
        await connection.dropDatabase();

        await connection.destroy();
    });

    it("should be able to update e_mail with e_mail", async () => {
        const responseAuthor = await request(app).post("/author").send({
            id: faker.datatype.uuid(),
            name: faker.name.fullName(),
            whatsapp: faker.phone.number(),
        });

        const author = responseAuthor.body as Author;

        const responseCreateEmail = await request(app).post("/email").send({
            id: faker.datatype.uuid(),
            e_mail: "old-email@email.com",
            author_id: author.id,
        });

        const { e_mail } = responseCreateEmail.body as Email;

        const oldE_mail = e_mail;
        const newE_mail = "new-email@email.com";

        const responseUpdateE_mail = await request(app)
            .patch("/email/update")
            .send({ oldE_mail, newE_mail });

        expect(responseUpdateE_mail.status).toBe(200);
    });

    it("should not be able to update e_mail with oldE_mail invalid", async () => {
        const oldE_mail = "fake-email@email.com";
        const newE_mail = "new-email@email.com";

        const responseUpdateE_mail = await request(app)
            .patch("/email/update")
            .send({ oldE_mail, newE_mail });

        expect(responseUpdateE_mail.status).toBe(404);
    });

    it("should not be able to update e_mail with newE_mail already exists", async () => {
        const responseAuthor = await request(app).post("/author").send({
            id: faker.datatype.uuid(),
            name: faker.name.fullName(),
            whatsapp: faker.phone.number(),
        });

        const author = responseAuthor.body as Author;

        const responseCreateEmail1 = await request(app).post("/email").send({
            id: faker.datatype.uuid(),
            e_mail: "old1-email@email.com",
            author_id: author.id,
        });

        await request(app).post("/email").send({
            id: faker.datatype.uuid(),
            e_mail: "old2-email@email.com",
            author_id: author.id,
        });

        const { e_mail } = responseCreateEmail1.body as Email;

        const oldE_mail = e_mail;
        const newE_mail = "old2-email@email.com";

        const responseUpdateE_mail = await request(app)
            .patch("/email/update")
            .send({ oldE_mail, newE_mail });

        expect(responseUpdateE_mail.status).toBe(401);
    });
});
