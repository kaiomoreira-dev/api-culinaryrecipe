import { faker } from "@faker-js/faker";
import { ICreateProdutoDTO } from "@modules/recipe/dtos/ICreateProdutoDTO";
import { ProdutoRepositoryInMemory } from "@modules/recipe/repositories/in-Memory/ProdutoRepositoryInMemory";

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
});
