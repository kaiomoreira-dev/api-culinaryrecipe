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

describe("List author Controller", () => {
    beforeAll(async () => {
        connection = await createConnection("localhost");

        await connection.runMigrations();
    });

    afterAll(async () => {
        await connection.dropDatabase();

        await connection.destroy();
    });

    it("should be able to list authors", async () => {
        //
        const resposeCreateAuthor = await request(app).post("/author").send({
            id: "86a5a72d-308a-41d2-a166-89966c738804",
            name: "Kaio Moreira",
            whatsapp: faker.phone.number(),
        });

        const { id: author_id } = resposeCreateAuthor.body as Author;

        await request(app).post("/email").send({
            id: faker.datatype.uuid(),
            e_mail: faker.internet.email(),
            author_id,
        });

        await request(app).post("/email").send({
            id: faker.datatype.uuid(),
            e_mail: faker.internet.email(),
            author_id,
        });

        const resposeCreateProduto1 = await request(app).post("/produto").send({
            id: faker.datatype.uuid(),
            name: "Alho",
            description: faker.lorem.paragraphs(),
        });

        const { id: produto_id1 } = resposeCreateProduto1.body as Produto;

        const resposeCreateProduto2 = await request(app).post("/produto").send({
            id: faker.datatype.uuid(),
            name: "Cebola",
            description: faker.lorem.paragraphs(),
        });

        const { id: produto_id2 } = resposeCreateProduto2.body as Produto;

        const responseCreateIngredient1 = await request(app)
            .post("/ingredient")
            .send({
                id: faker.datatype.uuid(),
                produto_id: produto_id1,
                name: "Alho",
                description: faker.lorem.paragraphs(),
                unity: 1,
                weight: 100,
            });

        const responseCreateIngredient2 = await request(app)
            .post("/ingredient")
            .send({
                id: faker.datatype.uuid(),
                produto_id: produto_id2,
                name: "Cebola",
                description: faker.lorem.paragraphs(),
                unity: 1,
                weight: 100,
            });

        const { id: ingredient_id1 } =
            responseCreateIngredient1.body as Ingredient;
        const { id: ingredient_id2 } =
            responseCreateIngredient2.body as Ingredient;

        const ingredients: string[] = [ingredient_id1, ingredient_id2];

        const x = await request(app)
            .post("/recipe")
            .send({
                id: faker.datatype.uuid(),
                name: "Receita 1",
                description: faker.lorem.words(10),
                time: 20,
                difficulty: "easy",
                dish_type: "appetizer",
                additional_features: "cheap dish",
                total_guests: 5,
                ingredients,
                author_id,
            });

        const responseListAuthors = await request(app).get("/author").send({});

        // console.log(JSON.stringify(responseListAuthors.body, null, 2));

        expect(responseListAuthors.status).toBe(200);
    });
});
