import { IngredientRepositoryInMemory } from "@modules/recipe/repositories/in-Memory/IngredientRepositoryInMemory";
import { ProdutoRepositoryInMemory } from "@modules/recipe/repositories/in-Memory/ProdutoRepositoryInMemory";

import { CreateIngredientUseCase } from "../createIngredient/CreateIngredientUseCase";
import { CreateProdutoUseCase } from "../createProduto/CreateProdutoUseCase";
import { ListProdutosUseCase } from "../listProdutos/ListProdutosUseCase";

let produtoRepositoryInMemory: ProdutoRepositoryInMemory;
let ingredientRepositoryInMemory: IngredientRepositoryInMemory;
let createIngredientUseCase: CreateIngredientUseCase;
let createProdutoUseCase: CreateProdutoUseCase;
let listProdutoUseCase: ListProdutosUseCase;

describe("List ingredients UseCase", () => {
    beforeEach(() => {
        produtoRepositoryInMemory = new ProdutoRepositoryInMemory();
        ingredientRepositoryInMemory = new IngredientRepositoryInMemory();

        createIngredientUseCase = new CreateIngredientUseCase(
            ingredientRepositoryInMemory,
            produtoRepositoryInMemory
        );
        createProdutoUseCase = new CreateProdutoUseCase(
            produtoRepositoryInMemory
        );
        listProdutoUseCase = new ListProdutosUseCase(produtoRepositoryInMemory);
    });
});
