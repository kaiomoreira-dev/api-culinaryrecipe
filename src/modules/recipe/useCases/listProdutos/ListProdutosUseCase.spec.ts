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
});
