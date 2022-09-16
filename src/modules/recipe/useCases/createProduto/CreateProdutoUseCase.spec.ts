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
});
