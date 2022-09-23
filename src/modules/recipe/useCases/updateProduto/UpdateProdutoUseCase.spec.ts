import { faker } from "@faker-js/faker";
import { ICreateProdutoDTO } from "@modules/recipe/dtos/ICreateProdutoDTO";
import { ProdutoRepositoryInMemory } from "@modules/recipe/repositories/in-Memory/ProdutoRepositoryInMemory";

import { AppError } from "@shared/errors/AppError";
import { redisClient } from "@shared/infra/http/middlewares/rateLimiter";

import { CreateProdutoUseCase } from "../createProduto/CreateProdutoUseCase";
import { UpdateProdutoUseCase } from "./UpdateProdutoUseCase";

let produtoRepositoryInMemory: ProdutoRepositoryInMemory;
let createProdutoUseCase: CreateProdutoUseCase;
let updateProdutoUseCase: UpdateProdutoUseCase;

describe("Update produto UseCase", () => {
  beforeEach(() => {
    produtoRepositoryInMemory = new ProdutoRepositoryInMemory();

    createProdutoUseCase = new CreateProdutoUseCase(produtoRepositoryInMemory);

    updateProdutoUseCase = new UpdateProdutoUseCase(produtoRepositoryInMemory);
  });

  afterAll(() => {
    redisClient.quit();
  });

  it("should be able to update produto", async () => {
    const produto: ICreateProdutoDTO = {
      id: faker.datatype.uuid(),
      name: "Alho",
      description: faker.lorem.paragraphs(),
    };

    const createProduto = await createProdutoUseCase.execute(produto);

    const updateProduto = await updateProdutoUseCase.execute(createProduto.id);

    expect(updateProduto).toHaveProperty("id");
  });

  it("should not be able to update produto not exists", async () => {
    const produtoIdFake = faker.datatype.uuid();

    await expect(updateProdutoUseCase.execute(produtoIdFake)).rejects.toEqual(
      new AppError("Produto not found", 404)
    );
  });
});
