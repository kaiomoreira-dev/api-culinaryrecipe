import { IngredientRepositoryInMemory } from "@modules/recipe/repositories/in-Memory/IngredientRepositoryInMemory";
import { ProdutoRepositoryInMemory } from "@modules/recipe/repositories/in-Memory/ProdutoRepositoryInMemory";

import { CreateProdutoUseCase } from "../createProduto/CreateProdutoUseCase";
import { CreateIngredientUseCase } from "./CreateIngredientUseCase";

let produtoRepositoryInMemory: ProdutoRepositoryInMemory;
let ingredientRepositoryInMemory: IngredientRepositoryInMemory;
let createIngredientUseCase: CreateIngredientUseCase;
let createProdutoUseCase: CreateProdutoUseCase;
