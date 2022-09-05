import "dotenv/config";
import { faker } from "@faker-js/faker";
import { Author } from "@modules/author/infra/typeorm/entities/Author";
import request from "supertest";
import { DataSource } from "typeorm";

import { app } from "@shared/infra/http/app";
import { createConnection } from "@shared/infra/typeorm";

let connection: DataSource;

describe("Find author Controller", () => {
    beforeAll(async () => {
        connection = await createConnection("localhost");

        await connection.runMigrations();
    });

    afterAll(async () => {
        await connection.dropDatabase();

        await connection.destroy();
    });

    it("should be able to find author using name", async () => {
        const responseAuthor = await request(app).post("/author").send({
            id: faker.datatype.uuid(),
            name: "Kaio Moreira",
            whatsapp: faker.phone.number(),
        });

        const { name } = responseAuthor.body as Author;

        const responseFindAuthor = await request(app).get("/author/find").send({
            author_name: name,
        });

        expect(responseFindAuthor.status).toBe(200);
    });

    it("should not be able to find author using name invalid", async () => {
        const name = "fake-name";

        const responseFindAuthor = await request(app).get("/author/find").send({
            author_name: name,
        });

        expect(responseFindAuthor.status).toBe(404);
    });
});
