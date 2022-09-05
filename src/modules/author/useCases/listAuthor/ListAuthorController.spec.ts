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
        await request(app)
            .post("/author")
            .send({
                id: "86a5a72d-308a-41d2-a166-89966c738804",
                name: "Kaio Moreira",
                whatsapp: faker.phone.number(),
                emails: [
                    {
                        id: faker.datatype.uuid(),
                        e_mail: faker.internet.email(),
                        author_id: "86a5a72d-308a-41d2-a166-89966c738804",
                        created_at: faker.datatype.datetime(),
                        updated_at: faker.datatype.datetime(),
                    },
                ],
                recipes: [
                    {
                        id: faker.datatype.uuid(),
                        name: "Receita test 1",
                        description: faker.lorem.paragraphs(),
                        author_id: "86a5a72d-308a-41d2-a166-89966c738804",
                        difficulty: "medium",
                        dish_type: "appetizer",
                        time: 5,
                        total_guests: 5,
                        additional_features: "low custom",
                        ingredients: [
                            {
                                id: faker.datatype.uuid(),
                                description: faker.lorem.paragraphs(),
                                name: "alho roxo",
                                produto_id:
                                    "0458f9a7-e132-487e-ac1c-e072bfa1422d",
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
