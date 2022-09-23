import { faker } from "@faker-js/faker";
import { ICreateIngredientDTO } from "@modules/recipe/dtos/ICreateIngredientDTO";
import { ICreateProdutoDTO } from "@modules/recipe/dtos/ICreateProdutoDTO";
import { IngredientRepositoryInMemory } from "@modules/recipe/repositories/in-Memory/IngredientRepositoryInMemory";
import { ProdutoRepositoryInMemory } from "@modules/recipe/repositories/in-Memory/ProdutoRepositoryInMemory";

import { AppError } from "@shared/errors/AppError";
import { redisClient } from "@shared/infra/http/middlewares/rateLimiter";

import { CreateProdutoUseCase } from "../createProduto/CreateProdutoUseCase";
import { CreateIngredientUseCase } from "./CreateIngredientUseCase";

let produtoRepositoryInMemory: ProdutoRepositoryInMemory;
let ingredientRepositoryInMemory: IngredientRepositoryInMemory;
let createIngredientUseCase: CreateIngredientUseCase;
let createProdutoUseCase: CreateProdutoUseCase;

describe("Create ingredient UseCase", () => {
  beforeEach(() => {
    produtoRepositoryInMemory = new ProdutoRepositoryInMemory();
    ingredientRepositoryInMemory = new IngredientRepositoryInMemory();

    createIngredientUseCase = new CreateIngredientUseCase(
      ingredientRepositoryInMemory,
      produtoRepositoryInMemory
    );
    createProdutoUseCase = new CreateProdutoUseCase(produtoRepositoryInMemory);
  });

  afterAll(() => {
    redisClient.quit();
  });

  it("should be able to create ingredient", async () => {
    const produto1: ICreateProdutoDTO = {
      id: faker.datatype.uuid(),
      name: "Alho",
      description: faker.lorem.paragraphs(),
    };

    const createProduto1 = await createProdutoUseCase.execute(produto1);

    const ingredient1: ICreateIngredientDTO = {
      id: faker.datatype.uuid(),
      produto_id: createProduto1.id,
      unity: 1,
      weight: 100,
    };

    const createIngredient1 = await createIngredientUseCase.execute(
      ingredient1
    );

    expect(createIngredient1).toHaveProperty("id");
  });

  it("should not be able to create ingredient with produto_id invalid", async () => {
    const produtoIdFake = "643a172e-54d1-49ad-8877-9687632da171";

    const ingredient1: ICreateIngredientDTO = {
      id: faker.datatype.uuid(),
      produto_id: produtoIdFake,
      unity: 1,
      weight: 100,
    };

    await expect(createIngredientUseCase.execute(ingredient1)).rejects.toEqual(
      new AppError("Produto not found.", 401)
    );
  });

  it("should not be able to create ingredient with ingredient already exists", async () => {
    const produto1: ICreateProdutoDTO = {
      id: faker.datatype.uuid(),
      name: "Alho",
      description: faker.lorem.paragraphs(),
    };

    const createProduto1 = await createProdutoUseCase.execute(produto1);

    const ingredient1: ICreateIngredientDTO = {
      id: faker.datatype.uuid(),
      produto_id: createProduto1.id,
      unity: 1,
      weight: 100,
    };

    await createIngredientUseCase.execute(ingredient1);

    await expect(createIngredientUseCase.execute(ingredient1)).rejects.toEqual(
      new AppError("Ingredient already exists.", 401)
    );
  });
});
