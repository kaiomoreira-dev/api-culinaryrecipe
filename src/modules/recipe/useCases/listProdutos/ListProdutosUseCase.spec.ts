import { faker } from "@faker-js/faker";
import { ICreateProdutoDTO } from "@modules/recipe/dtos/ICreateProdutoDTO";
import { ProdutoRepositoryInMemory } from "@modules/recipe/repositories/in-Memory/ProdutoRepositoryInMemory";

import { AppError } from "@shared/errors/AppError";

import { CreateProdutoUseCase } from "../createProduto/CreateProdutoUseCase";
import { ListProdutosUseCase } from "./ListProdutosUseCase";

let produtoRepositoryInMemory: ProdutoRepositoryInMemory;
let createProdutoUseCase: CreateProdutoUseCase;
let listProdutosUseCase: ListProdutosUseCase;

describe("List produto UseCase", () => {
    beforeEach(() => {
        produtoRepositoryInMemory = new ProdutoRepositoryInMemory();

        createProdutoUseCase = new CreateProdutoUseCase(
            produtoRepositoryInMemory
        );

        listProdutosUseCase = new ListProdutosUseCase(
            produtoRepositoryInMemory
        );
    });

    it("should be able to list produtos", async () => {
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

        await createProdutoUseCase.execute(produto1);

        await createProdutoUseCase.execute(produto2);

        const listProdutos = await listProdutosUseCase.execute();

        expect(listProdutos[0]).toHaveProperty("id");
    });
});
