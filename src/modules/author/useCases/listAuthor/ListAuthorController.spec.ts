import "dotenv/config";
import { faker } from "@faker-js/faker";
import request from "supertest";
import { DataSource } from "typeorm";

import { app } from "@shared/infra/http/app";
import { createConnection } from "@shared/infra/typeorm";

let connection: DataSource;

describe("List author Controller", () => {
    beforeAll(async () => {
        connection = await createConnection("localhost");

        await connection.runMigrations();
    });

    afterAll(async () => {
        await connection.dropDatabase();

        await connection.destroy();
    });

    it("should to list authors", async () => {
        const responseAuthor = await request(app)
            .post("/author")
            .send({
                id: faker.datatype.uuid(),
                name: "Kaio Moreira",
                whatsapp: faker.phone.number(),
                emails: [
                    {
                        id: faker.datatype.uuid(),
                        e_mail: faker.internet.email(),
                        author_name: "Kaio Moreira",
                        created_at: faker.datatype.datetime(),
                        updated_at: faker.datatype.datetime(),
                    },
                ],
                recipes: [
                    {
                        id: faker.datatype.uuid(),
                        name: "Receita test 1",
                        description: faker.lorem.paragraphs(),
                        author_name: "Kaio Moreira",
                        difficulty: "medium",
                        dish_type: "appetizer",
                        time: 5,
                        total_guests: 5,
                        additional_features: "low custom",
                        ingredients: [
                            {
                                id: faker.datatype.uuid(),
                                description: faker.lorem.paragraphs(),
                                produto_name: "Alho roxo",
                                unity: 1,
                                weight: 100,
                                created_at: String(faker.datatype.datetime()),
                                updated_at: String(faker.datatype.datetime()),
                            },
                        ],
                        created_at: faker.datatype.datetime(),
                        updated_at: faker.datatype.datetime(),
                    },
                ],
            });

        const responseListAuthors = await request(app).get("/author").send({});

        // console.log(JSON.stringify(responseAuthor.body, null, 2));

        expect(responseListAuthors.status).toBe(200);
    });
});
