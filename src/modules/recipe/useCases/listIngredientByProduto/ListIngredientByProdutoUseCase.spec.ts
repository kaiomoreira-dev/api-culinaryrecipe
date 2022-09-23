import { faker } from "@faker-js/faker";
import { ICreateIngredientDTO } from "@modules/recipe/dtos/ICreateIngredientDTO";
import { ICreateProdutoDTO } from "@modules/recipe/dtos/ICreateProdutoDTO";
import { IngredientRepositoryInMemory } from "@modules/recipe/repositories/in-Memory/IngredientRepositoryInMemory";
import { ProdutoRepositoryInMemory } from "@modules/recipe/repositories/in-Memory/ProdutoRepositoryInMemory";

import { AppError } from "@shared/errors/AppError";
import { redisClient } from "@shared/infra/http/middlewares/rateLimiter";

import { CreateIngredientUseCase } from "../createIngredient/CreateIngredientUseCase";
import { CreateProdutoUseCase } from "../createProduto/CreateProdutoUseCase";
import { ListIngredientByProdutoUseCase } from "./ListIngredientByProdutoUseCase";

let produtoRepositoryInMemory: ProdutoRepositoryInMemory;
let ingredientRepositoryInMemory: IngredientRepositoryInMemory;
let createIngredientUseCase: CreateIngredientUseCase;
let createProdutoUseCase: CreateProdutoUseCase;
let listIngredientByProdutoUseCase: ListIngredientByProdutoUseCase;

describe("List ingredient by produto UseCase", () => {
  beforeEach(() => {
    produtoRepositoryInMemory = new ProdutoRepositoryInMemory();
    ingredientRepositoryInMemory = new IngredientRepositoryInMemory();

    createIngredientUseCase = new CreateIngredientUseCase(
      ingredientRepositoryInMemory,
      produtoRepositoryInMemory
    );
    createProdutoUseCase = new CreateProdutoUseCase(produtoRepositoryInMemory);

    listIngredientByProdutoUseCase = new ListIngredientByProdutoUseCase(
      ingredientRepositoryInMemory,
      produtoRepositoryInMemory
    );
  });

  afterAll(() => {
    redisClient.quit();
  });

  it("should be able to list all ingredient by produto", async () => {
    const produto1: ICreateProdutoDTO = {
      id: faker.datatype.uuid(),
      name: "Alho",
      description: faker.lorem.paragraphs(),
    };
    const produto2: ICreateProdutoDTO = {
      id: faker.datatype.uuid(),
      name: "Cebola",
      description: faker.lorem.paragraphs(),
    };

    const createProduto1 = await createProdutoUseCase.execute(produto1);

    const createProduto2 = await createProdutoUseCase.execute(produto2);

    const ingredient1: ICreateIngredientDTO = {
      id: faker.datatype.uuid(),
      produto_id: createProduto1.id,
      unity: 1,
      weight: 100,
    };

    const ingredient2: ICreateIngredientDTO = {
      id: faker.datatype.uuid(),
      produto_id: createProduto2.id,
      unity: 1,
      weight: 100,
    };

    const ingredient3: ICreateIngredientDTO = {
      id: faker.datatype.uuid(),
      produto_id: createProduto2.id,
      unity: 1,
      weight: 200,
    };

    await createIngredientUseCase.execute(ingredient1);

    await createIngredientUseCase.execute(ingredient2);

    await createIngredientUseCase.execute(ingredient3);

    const ingredients = await listIngredientByProdutoUseCase.execute(
      createProduto2.id
    );

    expect(ingredients[0]).toHaveProperty("id");
  });

  it("should not be able to list all ingredient by produto with produti_id invalid", async () => {
    const produtoIdFake = faker.datatype.uuid();
    await expect(
      listIngredientByProdutoUseCase.execute(produtoIdFake)
    ).rejects.toEqual(new AppError("Produto not found", 404));
  });
});
