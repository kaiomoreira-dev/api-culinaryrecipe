import "dotenv/config";
import { faker } from "@faker-js/faker";
import { Produto } from "@modules/recipe/infra/typeorm/entities/Produto";
import request from "supertest";
import { DataSource } from "typeorm";

import { app } from "@shared/infra/http/app";
import { createConnection } from "@shared/infra/typeorm";

let connection: DataSource;

describe("List ingredients by produto Controller", () => {
  beforeAll(async () => {
    connection = await createConnection("localhost");

    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();

    await connection.destroy();
  });

  it("should be able to list ingredients by produto_id", async () => {
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

    await request(app).post("/ingredient").send({
      id: faker.datatype.uuid(),
      produto_id: prodId1,
      unity: 1,
      weight: 100,
    });

    await request(app).post("/ingredient").send({
      id: faker.datatype.uuid(),
      produto_id: prodId2,
      unity: 1,
      weight: 100,
    });

    await request(app).post("/ingredient").send({
      id: faker.datatype.uuid(),
      produto_id: prodId2,
      unity: 1,
      weight: 200,
    });

    const ingredients = await request(app)
      .get(`/ingredient/produto/${prodId2}`)
      .send();

    expect(ingredients.status).toBe(200);
  });
});
