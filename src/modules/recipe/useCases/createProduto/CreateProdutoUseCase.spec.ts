import { faker } from "@faker-js/faker";
import { ICreateProdutoDTO } from "@modules/recipe/dtos/ICreateProdutoDTO";
import { ProdutoRepositoryInMemory } from "@modules/recipe/repositories/in-Memory/ProdutoRepositoryInMemory";

import { AppError } from "@shared/errors/AppError";

import { CreateProdutoUseCase } from "./CreateProdutoUseCase";

let produtoRepositoryInMemory: ProdutoRepositoryInMemory;
let createProdutoUseCase: CreateProdutoUseCase;

describe("Create produto UseCase", () => {
    beforeEach(() => {
        produtoRepositoryInMemory = new ProdutoRepositoryInMemory();

        createProdutoUseCase = new CreateProdutoUseCase(
            produtoRepositoryInMemory
        );
    });

    it("should be able to create produto", async () => {
        const produto: ICreateProdutoDTO = {
            id: faker.datatype.uuid(),
            name: "Alho",
            description: faker.lorem.paragraphs(),
        };

        const createProduto = await createProdutoUseCase.execute(produto);

        expect(createProduto).toHaveProperty("id");
    });

    it("should not be able to create produto is already exists", async () => {
        const produto1: ICreateProdutoDTO = {
            id: faker.datatype.uuid(),
            name: "Alho",
            description: faker.lorem.paragraphs(),
        };

        const produto2: ICreateProdutoDTO = {
            id: faker.datatype.uuid(),
            name: "Alho",
            description: faker.lorem.paragraphs(),
        };

        await createProdutoUseCase.execute(produto1);

        await expect(createProdutoUseCase.execute(produto2)).rejects.toEqual(
            new AppError("Produto already exists", 401)
        );
    });
});
