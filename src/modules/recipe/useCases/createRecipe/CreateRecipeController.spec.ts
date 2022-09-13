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
        const produto1 = await request(app)
            .post("/produto")
            .send({
                id: faker.datatype.uuid(),
                name: "Alho",
                description: faker.lorem.words(20),
            });
        const { id: prodId1 } = produto1.body as Produto;
        const produto2 = await request(app)
            .post("/produto")
            .send({
                id: faker.datatype.uuid(),
                name: "Coentro",
                description: faker.lorem.words(20),
            });

        const { id: prodId2 } = produto2.body as Produto;

        const ingredient1 = await request(app)
            .post("/ingredient")
            .send({
                id: faker.datatype.uuid(),
                produto_id: prodId1,
                name: "Alho",
                description: faker.lorem.words(20),
                unity: 1,
                weight: 100,
            });

        const { id: ingredient1Id } = ingredient1.body as Ingredient;

        const ingredient2 = await request(app)
            .post("/ingredient")
            .send({
                id: faker.datatype.uuid(),
                produto_id: prodId2,
                name: "Cebola",
                description: faker.lorem.words(20),
                unity: 1,
                weight: 100,
            });
        const { id: ingredient2Id } = ingredient2.body as Ingredient;

        const author = await request(app).post("/author").send({
            id: faker.datatype.uuid(),
            name: "Kaio Moreira",
            whatsapp: faker.phone.number(),
        });

        const { id: authorId } = author.body as Author;

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
                ingredients: [ingredient2Id, ingredient1Id],
                author_id: authorId,
            });

        expect(responseCreateRecipe.status).toBe(200);
    });
    it("should not be able to create recipe with difficulty incorrect", async () => {
        const produto1 = await request(app)
            .post("/produto")
            .send({
                id: faker.datatype.uuid(),
                name: "Alho",
                description: faker.lorem.words(20),
            });
        const { id: prodId1 } = produto1.body as Produto;
        const produto2 = await request(app)
            .post("/produto")
            .send({
                id: faker.datatype.uuid(),
                name: "Coentro",
                description: faker.lorem.words(20),
            });

        const { id: prodId2 } = produto2.body as Produto;

        const ingredient1 = await request(app)
            .post("/ingredient")
            .send({
                id: faker.datatype.uuid(),
                produto_id: prodId1,
                name: "Alho",
                description: faker.lorem.words(20),
                unity: 1,
                weight: 100,
            });

        const { id: ingredient1Id } = ingredient1.body as Ingredient;

        const ingredient2 = await request(app)
            .post("/ingredient")
            .send({
                id: faker.datatype.uuid(),
                produto_id: prodId2,
                name: "Cebola",
                description: faker.lorem.words(20),
                unity: 1,
                weight: 100,
            });
        const { id: ingredient2Id } = ingredient2.body as Ingredient;

        const author = await request(app).post("/author").send({
            id: faker.datatype.uuid(),
            name: "Kaio Moreira",
            whatsapp: faker.phone.number(),
        });

        const { id: authorId } = author.body as Author;

        const responseCreateRecipe = await request(app)
            .post("/recipe")
            .send({
                id: faker.datatype.uuid(),
                name: "Receita 1",
                description: faker.lorem.words(20),
                time: 20,
                difficulty: "fake-difficulty",
                dish_type: "appetizer",
                additional_features: "cheap dish",
                total_guests: 5,
                ingredients: [ingredient2Id, ingredient1Id],
                author_id: authorId,
            });

        expect(responseCreateRecipe.status).toBe(401);
    });
    it("should not be able to create recipe with dish_type incorrect", async () => {
        const produto1 = await request(app)
            .post("/produto")
            .send({
                id: faker.datatype.uuid(),
                name: "Alho",
                description: faker.lorem.words(20),
            });
        const { id: prodId1 } = produto1.body as Produto;
        const produto2 = await request(app)
            .post("/produto")
            .send({
                id: faker.datatype.uuid(),
                name: "Coentro",
                description: faker.lorem.words(20),
            });

        const { id: prodId2 } = produto2.body as Produto;

        const ingredient1 = await request(app)
            .post("/ingredient")
            .send({
                id: faker.datatype.uuid(),
                produto_id: prodId1,
                name: "Alho",
                description: faker.lorem.words(20),
                unity: 1,
                weight: 100,
            });

        const { id: ingredient1Id } = ingredient1.body as Ingredient;

        const ingredient2 = await request(app)
            .post("/ingredient")
            .send({
                id: faker.datatype.uuid(),
                produto_id: prodId2,
                name: "Cebola",
                description: faker.lorem.words(20),
                unity: 1,
                weight: 100,
            });
        const { id: ingredient2Id } = ingredient2.body as Ingredient;

        const author = await request(app).post("/author").send({
            id: faker.datatype.uuid(),
            name: "Kaio Moreira",
            whatsapp: faker.phone.number(),
        });

        const { id: authorId } = author.body as Author;

        const responseCreateRecipe = await request(app)
            .post("/recipe")
            .send({
                id: faker.datatype.uuid(),
                name: "Receita 1",
                description: faker.lorem.words(20),
                time: 20,
                difficulty: "easy",
                dish_type: "faker-dish_type",
                additional_features: "cheap dish",
                total_guests: 5,
                ingredients: [ingredient2Id, ingredient1Id],
                author_id: authorId,
            });

        expect(responseCreateRecipe.status).toBe(401);
    });
    // it("should not be able to create recipe with author_id incorrect", async () => {
    //     const produto1 = await request(app)
    //         .post("/produto")
    //         .send({
    //             id: faker.datatype.uuid(),
    //             name: "Alho",
    //             description: faker.lorem.words(20),
    //         });
    //     const { id: prodId1 } = produto1.body as Produto;
    //     const produto2 = await request(app)
    //         .post("/produto")
    //         .send({
    //             id: faker.datatype.uuid(),
    //             name: "Coentro",
    //             description: faker.lorem.words(20),
    //         });

    //     const { id: prodId2 } = produto2.body as Produto;

    //     const ingredient1 = await request(app)
    //         .post("/ingredient")
    //         .send({
    //             id: faker.datatype.uuid(),
    //             produto_id: prodId1,
    //             name: "Alho",
    //             description: faker.lorem.words(20),
    //             unity: 1,
    //             weight: 100,
    //         });

    //     const { id: ingredient1Id } = ingredient1.body as Ingredient;

    //     const ingredient2 = await request(app)
    //         .post("/ingredient")
    //         .send({
    //             id: faker.datatype.uuid(),
    //             produto_id: prodId2,
    //             name: "Cebola",
    //             description: faker.lorem.words(20),
    //             unity: 1,
    //             weight: 100,
    //         });
    //     const { id: ingredient2Id } = ingredient2.body as Ingredient;

    //     const fakeAuthor = "cfa55f56-8703-4ebc-a95e-f32c032c9484";

    //     const responseCreateRecipe = await request(app)
    //         .post("/recipe")
    //         .send({
    //             id: faker.datatype.uuid(),
    //             name: "Receita 1",
    //             description: faker.lorem.words(20),
    //             time: 20,
    //             difficulty: "easy",
    //             dish_type: "appetizer",
    //             additional_features: "cheap dish",
    //             total_guests: 5,
    //             ingredients: [ingredient2Id, ingredient1Id],
    //             author_id: fakeAuthor,
    //         });

    //     expect(responseCreateRecipe.status).toBe(404);
    // });
    // it("should not be able to create recipe with less than two ingredients", async () => {
    //     const produto1 = await request(app)
    //         .post("/produto")
    //         .send({
    //             id: faker.datatype.uuid(),
    //             name: "Alho",
    //             description: faker.lorem.words(20),
    //         });
    //     const { id: prodId1 } = produto1.body as Produto;

    //     const ingredient1 = await request(app)
    //         .post("/ingredient")
    //         .send({
    //             id: faker.datatype.uuid(),
    //             produto_id: prodId1,
    //             name: "Alho",
    //             description: faker.lorem.words(20),
    //             unity: 1,
    //             weight: 100,
    //         });

    //     const { id: ingredient1Id } = ingredient1.body as Ingredient;

    //     const author = await request(app).post("/author").send({
    //         id: faker.datatype.uuid(),
    //         name: "Kaio Moreira",
    //         whatsapp: faker.phone.number(),
    //     });

    //     const { id: authorId } = author.body as Author;

    //     const responseCreateRecipe = await request(app)
    //         .post("/recipe")
    //         .send({
    //             id: faker.datatype.uuid(),
    //             name: "Receita 1",
    //             description: faker.lorem.words(20),
    //             time: 20,
    //             difficulty: "easy",
    //             dish_type: "appetizer",
    //             additional_features: "cheap dish",
    //             total_guests: 5,
    //             ingredients: [ingredient1Id],
    //             author_id: authorId,
    //         });

    //     expect(responseCreateRecipe.status).toBe(401);
    // });
    // it("should not be able to create recipe with ingredients invalid", async () => {
    //     const author = await request(app).post("/author").send({
    //         id: faker.datatype.uuid(),
    //         name: "Kaio Moreira",
    //         whatsapp: faker.phone.number(),
    //     });

    //     const { id: authorId } = author.body as Author;

    //     const fakeIngredientId1 = "e33a9e63-2634-42ef-90dd-f9137a2a7b9b";
    //     const fakeIngredientId2 = "4d8e19fe-fec1-431e-96d2-4dce6fd3ae9f";
    //     const ingredients: string[] = [fakeIngredientId1, fakeIngredientId2];

    //     const responseCreateRecipe = await request(app)
    //         .post("/recipe")
    //         .send({
    //             id: faker.datatype.uuid(),
    //             name: "Receita 1",
    //             description: faker.lorem.words(20),
    //             time: 20,
    //             difficulty: "easy",
    //             dish_type: "appetizer",
    //             additional_features: "cheap dish",
    //             total_guests: 5,
    //             ingredients,
    //             author_id: authorId,
    //         });

    //     expect(responseCreateRecipe.status).toBe(404);
    // });
});
