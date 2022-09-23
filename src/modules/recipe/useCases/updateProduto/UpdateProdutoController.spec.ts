import "dotenv/config";
import { faker } from "@faker-js/faker";
import { Produto } from "@modules/recipe/infra/typeorm/entities/Produto";
import request from "supertest";
import { DataSource } from "typeorm";

import { app } from "@shared/infra/http/app";
import { createConnection } from "@shared/infra/typeorm";

let connection: DataSource;

describe("Create produto Controller", () => {
  beforeAll(async () => {
    connection = await createConnection("localhost");

    await connection.runMigrations();
  });

  afterAll(async () => {
    // dropbase
    await connection.dropDatabase();

    await connection.destroy();
  });

  it("should be able to create produto", async () => {
    const produto1 = await request(app)
      .post("/produto")
      .send({
        id: faker.datatype.uuid(),
        name: "Alho",
        description: faker.lorem.words(20),
      });

    const { id } = produto1.body as Produto;

    const responseUpdateProduto = await request(app)
      .put(`/produto/${id}`)
      .send({
        name: "Cebola",
        description: faker.lorem.words(5),
      });

    expect(responseUpdateProduto.status).toBe(200);
  });
});
