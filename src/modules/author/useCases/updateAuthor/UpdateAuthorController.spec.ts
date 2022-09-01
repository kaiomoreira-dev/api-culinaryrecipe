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

    it("should be able to update author using name", async () => {
        const responseAuthor = await request(app).post("/author").send({
            id: faker.datatype.uuid(),
            name: "Kaio Moreira",
            whatsapp: faker.phone.number(),
        });

        const { name } = responseAuthor.body as Author;

        const newName = "Kaio dos Santos Moreira";
        const whatsapp = "1234567890";

        const responseAuthorUpdated = await request(app)
            .put("/author/update")
            .send({
                name,
                newName,
                whatsapp,
            });

        expect(responseAuthorUpdated.status).toBe(200);
    });
});
