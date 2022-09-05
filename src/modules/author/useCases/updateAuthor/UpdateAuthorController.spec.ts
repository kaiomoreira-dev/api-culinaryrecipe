import "dotenv/config";
import { faker } from "@faker-js/faker";
import { Author } from "@modules/author/infra/typeorm/entities/Author";
import request from "supertest";
import { DataSource } from "typeorm";

import { app } from "@shared/infra/http/app";
import { createConnection } from "@shared/infra/typeorm";

let connection: DataSource;

describe("Update author Controller", () => {
    beforeAll(async () => {
        connection = await createConnection("localhost");

        await connection.runMigrations();
    });

    afterAll(async () => {
        await connection.dropDatabase();

        await connection.destroy();
    });

    it("should be able to update author using id", async () => {
        const responseAuthor = await request(app).post("/author").send({
            id: faker.datatype.uuid(),
            name: "Kaio Moreira",
            whatsapp: faker.phone.number(),
        });

        const { id } = responseAuthor.body as Author;

        const newName = "Kaio dos Santos Moreira";
        const whatsapp = "1234567890";

        const responseAuthorUpdated = await request(app)
            .put("/author/update")
            .send({
                id,
                newName,
                whatsapp,
            });

        expect(responseAuthorUpdated.status).toBe(200);
    });

    it("should not be able to update author using id invalid", async () => {
        const id = "0458f9a7-e132-487e-ac1c-e072bfa1422d";
        const newName = "Name test";
        const whatsapp = "whatsapp test";

        const responseAuthorUpdated = await request(app)
            .put("/author/update")
            .send({
                id,
                newName,
                whatsapp,
            });
        expect(responseAuthorUpdated.status).toBe(404);
    });

    it("should not be able to update author with newName is already exists", async () => {
        const responseAuthor = await request(app).post("/author").send({
            id: faker.datatype.uuid(),
            name: "Kaio Moreira",
            whatsapp: faker.phone.number(),
        });

        const { id, name } = responseAuthor.body as Author;

        const newName = name;
        const whatsapp = "1234567890";

        const responseAuthorUpdated = await request(app)
            .put("/author/update")
            .send({
                id,
                newName,
                whatsapp,
            });

        expect(responseAuthorUpdated.status).toBe(401);
    });

    it("should not be able to update author with whatsapp is already exists", async () => {
        const responseAuthor = await request(app).post("/author").send({
            id: faker.datatype.uuid(),
            name: "Kaio",
            whatsapp: faker.phone.number(),
        });

        const { id, whatsapp: whatsapp_exist } = responseAuthor.body as Author;

        const newName = "Kaio dos Santos Moreira";
        const whatsapp = whatsapp_exist;

        const responseAuthorUpdated = await request(app)
            .put("/author/update")
            .send({
                id,
                newName,
                whatsapp,
            });

        expect(responseAuthorUpdated.status).toBe(401);
    });
});
