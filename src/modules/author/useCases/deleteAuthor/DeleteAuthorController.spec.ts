import "dotenv/config";
import { faker } from "@faker-js/faker";
import { Author } from "@modules/author/infra/typeorm/entities/Author";
import { Ingredient } from "@modules/recipe/infra/typeorm/entities/Ingredient";
import { Produto } from "@modules/recipe/infra/typeorm/entities/Produto";
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

        // criar recipes[produto,ingredient] e emails p/ author!!

        // Emails
        await request(app).post("/email").send({
            id: faker.datatype.uuid(),
            e_email: faker.internet.email(),
            author_id: id,
        });
        await request(app).post("/email").send({
            id: faker.datatype.uuid(),
            e_email: faker.internet.email(),
            author_id: id,
        });

        // Produtos
        const prod1 = await request(app)
            .post("/produto")
            .send({
                id: faker.datatype.uuid(),
                name: "Alho",
                description: faker.lorem.words(10),
            });

        const prod2 = await request(app)
            .post("/produto")
            .send({
                id: faker.datatype.uuid(),
                name: "Cebola",
                description: faker.lorem.words(10),
            });

        const { id: prodId1 } = prod1.body as Produto;
        const { id: prodId2 } = prod2.body as Produto;

        // Ingredients
        const ingredient1 = await request(app)
            .post("/ingredient")
            .send({
                id: faker.datatype.uuid(),
                produto_id: prodId1,
                description: faker.lorem.words(10),
                unity: 1,
                weight: 100,
            });
        const ingredient2 = await request(app)
            .post("/ingredient")
            .send({
                id: faker.datatype.uuid(),
                produto_id: prodId2,
                description: faker.lorem.words(10),
                unity: 1,
                weight: 100,
            });
        const { id: ingredientId1 } = ingredient1.body as Ingredient;
        const { id: ingredientId2 } = ingredient2.body as Ingredient;

        const ingredients: string[] = [ingredientId1, ingredientId2];

        // Recipes
        await request(app)
            .post("/recipe")
            .send({
                id: faker.datatype.uuid(),
                name: "Recipe Test 1",
                description: faker.lorem.words(10),
                time: 30,
                difficulty: "easy",
                dish_type: "appetizer",
                additional_features: "cheap dish",
                total_guests: 3,
                author_id: id,
                ingredients,
            });

        const responsAuthorDelete = await request(app)
            .delete(`/author/${id}`)
            .send();

        expect(responsAuthorDelete.status).toBe(200);
    });

    it("should not be able to delete author using id invalid", async () => {
        const id = "f060c7bc-4539-4bd8-a3ac-f4b7d98f54d6";

        const responsAuthorDelete = await request(app)
            .delete(`/author/${id}`)
            .send();

        expect(responsAuthorDelete.status).toBe(404);
    });
});
