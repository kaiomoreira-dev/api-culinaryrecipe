import "dotenv/config";
import { faker } from "@faker-js/faker";
import { Author } from "@modules/author/infra/typeorm/entities/Author";
import request from "supertest";
import { DataSource } from "typeorm";

import { app } from "@shared/infra/http/app";
import { createConnection } from "@shared/infra/typeorm";

let connection: DataSource;

describe("Delete author Controller", () => {
    beforeAll(async () => {
        connection = await createConnection("localhost");

        await connection.runMigrations();
    });

    afterAll(async () => {
        await connection.dropDatabase();

        await connection.destroy();
    });

    it("should be able to delete author using id", async () => {
        const responseAuthor = await request(app).post("/author").send({
            id: faker.datatype.uuid(),
            name: "Kaio Moreira",
            whatsapp: faker.phone.number(),
        });

        const { id } = responseAuthor.body as Author;

        const responsAuthorDelete = await request(app)
            .delete("/author/delete")
            .send({
                id,
            });

        expect(responsAuthorDelete.status).toBe(200);
    });

    it("should not be able to delete author using id invalid", async () => {
        const id = "f060c7bc-4539-4bd8-a3ac-f4b7d98f54d6";

        const responsAuthorDelete = await request(app)
            .delete("/author/delete")
            .send({
                id,
            });

        expect(responsAuthorDelete.status).toBe(404);
    });
});
