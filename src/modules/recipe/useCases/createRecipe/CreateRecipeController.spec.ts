import "dotenv/config";
import { faker } from "@faker-js/faker";
import { Ingredient } from "@modules/recipe/infra/typeorm/entities/Ingredient";
import { Produto } from "@modules/recipe/infra/typeorm/entities/Produto";
import request from "supertest";
import { DataSource } from "typeorm";

import { app } from "@shared/infra/http/app";
import { createConnection } from "@shared/infra/typeorm";

let connection: DataSource;

describe("Create recipe Controller", () => {
    beforeAll(async () => {
        connection = await createConnection("localhost");

        await connection.runMigrations();
    });

    afterAll(async () => {
        await connection.dropDatabase();

        await connection.destroy();
    });

    it("should be able to create a recipe", async () => {
        await request(app)
            .post("/produto")
            .send({
                id: faker.datatype.uuid(),
                name: "Alho",
                description: faker.lorem.words(20),
            });

        await request(app)
            .post("/produto")
            .send({
                id: faker.datatype.uuid(),
                name: "Coentro",
                description: faker.lorem.words(20),
            });

        await request(app)
            .post("/ingredient")
            .send({
                id: faker.datatype.uuid(),
                produto_name: "Alho",
                description: faker.lorem.words(20),
                unity: 1,
                weight: 100,
            });
        await request(app)
            .post("/ingredient")
            .send({
                id: faker.datatype.uuid(),
                produto_name: "Coentro",
                description: faker.lorem.words(20),
                unity: 1,
                weight: 100,
            });

        await request(app).post("/author").send({
            id: faker.datatype.uuid(),
            name: "Kaio Moreira",
            whatsapp: faker.phone.number(),
        });

        const responseCreateRecipe = await request(app)
            .post("/recipe")
            .send({
                id: faker.datatype.uuid(),
                name: "Receita 1",
                description: faker.lorem.words(20),
                time: 20,
                difficulty: "easy",
                dish_type: "appetizer",
                additional_features: "cheap dish",
                total_guests: 5,
                ingredients: ["Alho", "Coentro"],
                author_name: "Kaio Moreira",
            });

        expect(responseCreateRecipe.status).toBe(200);
    });
});
