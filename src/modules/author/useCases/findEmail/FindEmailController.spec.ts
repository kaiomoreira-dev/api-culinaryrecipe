import "dotenv/config";
import { faker } from "@faker-js/faker";
import { ICreateAuthorDTO } from "@modules/author/dtos/ICreateAuthorDTO";
import { Author } from "@modules/author/infra/typeorm/entities/Author";
import { Email } from "@modules/author/infra/typeorm/entities/Email";
import request from "supertest";
import { DataSource } from "typeorm";

import { app } from "@shared/infra/http/app";
import { createConnection } from "@shared/infra/typeorm";

let connection: DataSource;

describe("Find e-mail Controller", () => {
    beforeAll(async () => {
        connection = await createConnection("localhost");

        await connection.runMigrations();
    });

    afterAll(async () => {
        await connection.dropDatabase();

        await connection.destroy();
    });

    it("should be able to find email", async () => {
        const responseCreateAuthor = await request(app).post("/author").send({
            id: faker.datatype.uuid(),
            name: faker.name.fullName(),
            whatsapp: faker.phone.number(),
        });

        const author = responseCreateAuthor.body as Author;

        const responseCreateEmail = await request(app).post("/email").send({
            id: faker.datatype.uuid(),
            e_mail: faker.internet.email(),
            author_id: author.id,
        });

        const { id } = responseCreateEmail.body as Email;

        const responseFindEmail = await request(app)
            .get(`/email/find/${id}`)
            .send();

        expect(responseFindEmail.status).toBe(200);
    });

    it("should not be able to find email not valid", async () => {
        const e_mail = "fake-email@faker.com";

        const responseFindEmail = await request(app).get("/email/find").send({
            e_mail,
        });

        expect(responseFindEmail.status).toBe(404);
    });
});
