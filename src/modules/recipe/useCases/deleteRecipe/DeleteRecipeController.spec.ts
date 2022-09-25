import "dotenv/config";
import { faker } from "@faker-js/faker";
import { Author } from "@modules/author/infra/typeorm/entities/Author";
import { Ingredient } from "@modules/recipe/infra/typeorm/entities/Ingredient";
import { Produto } from "@modules/recipe/infra/typeorm/entities/Produto";
import { Recipe } from "@modules/recipe/infra/typeorm/entities/Recipe";
import request from "supertest";
import { DataSource } from "typeorm";

import { app } from "@shared/infra/http/app";
import { createConnection } from "@shared/infra/typeorm";

let connection: DataSource;

describe("Delete recipe Controller", () => {
  beforeAll(async () => {
    connection = await createConnection("localhost");

    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();

    await connection.destroy();
  });

  it("should be able to delete a recipe", async () => {
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

    const produto3 = await request(app)
      .post("/produto")
      .send({
        id: faker.datatype.uuid(),
        name: "Cebola",
        description: faker.lorem.words(20),
      });

    const { id: prodId3 } = produto3.body as Produto;

    const produto4 = await request(app)
      .post("/produto")
      .send({
        id: faker.datatype.uuid(),
        name: "Pimenta",
        description: faker.lorem.words(20),
      });

    const { id: prodId4 } = produto4.body as Produto;

    const ingredient1 = await request(app).post("/ingredient").send({
      id: faker.datatype.uuid(),
      produto_id: prodId1,
      unity: 1,
      weight: 100,
    });

    const { id: ingredient1Id } = ingredient1.body as Ingredient;

    const ingredient2 = await request(app).post("/ingredient").send({
      id: faker.datatype.uuid(),
      produto_id: prodId2,
      unity: 1,
      weight: 100,
    });
    const { id: ingredient2Id } = ingredient2.body as Ingredient;

    const ingredient3 = await request(app).post("/ingredient").send({
      id: faker.datatype.uuid(),
      produto_id: prodId3,
      unity: 1,
      weight: 100,
    });
    const { id: ingredient3Id } = ingredient3.body as Ingredient;

    const ingredient4 = await request(app).post("/ingredient").send({
      id: faker.datatype.uuid(),
      produto_id: prodId3,
      unity: 1,
      weight: 100,
    });
    const { id: ingredient4Id } = ingredient4.body as Ingredient;

    const author1 = await request(app).post("/author").send({
      id: faker.datatype.uuid(),
      name: "Kaio Moreira",
      whatsapp: faker.phone.number(),
    });

    const { id: authorId1 } = author1.body as Author;

    const responseCreateRecipe1 = await request(app)
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
        author_id: authorId1,
        ingredients: [ingredient2Id, ingredient1Id],
      });

    const { id } = responseCreateRecipe1.body as Recipe;

    await request(app)
      .post("/recipe")
      .send({
        id: faker.datatype.uuid(),
        name: "Receita 2",
        description: faker.lorem.words(20),
        time: 20,
        difficulty: "easy",
        dish_type: "appetizer",
        additional_features: "cheap dish",
        total_guests: 5,
        ingredients: [
          ingredient2Id,
          ingredient1Id,
          ingredient3Id,
          ingredient4Id,
        ],
        author_id: authorId1,
      });

    await request(app).delete(`/recipe/${id}`).send();

    const recipes = await request(app).get("/recipe").send();

    expect(recipes.status).toBe(200);
  });

  it("should not be able to delete a recipe with invalid id", async () => {
    const recipeIdFake = faker.datatype.uuid();

    const deleteRecipe = await request(app)
      .delete(`/recipe/${recipeIdFake}`)
      .send();

    const recipes = await request(app).get("/recipe").send();

    expect(deleteRecipe.status).toBe(404);
  });
});
