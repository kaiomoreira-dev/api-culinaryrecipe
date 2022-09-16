import { AuthorRepositoryInMemory } from "@modules/author/repositories/in-Memory/AuthorRepositoryInMemory";
import { EmailRepositoryInMemory } from "@modules/author/repositories/in-Memory/EmailRepositoryInMemory";
import { CreateAuthorUseCase } from "@modules/author/useCases/createAuthor/CreateAuthorUseCase";
import { IngredientRepositoryInMemory } from "@modules/recipe/repositories/in-Memory/IngredientRepositoryInMemory";
import { ProdutoRepositoryInMemory } from "@modules/recipe/repositories/in-Memory/ProdutoRepositoryInMemory";
import { RecipeRepositoryInMemory } from "@modules/recipe/repositories/in-Memory/RecipeRepositoryInMemory";

import { CreateIngredientUseCase } from "../../createIngredient/CreateIngredientUseCase";
import { CreateProdutoUseCase } from "../../createProduto/CreateProdutoUseCase";
import { CreateRecipeUseCase } from "../../createRecipe/CreateRecipeUseCase";

let emailRepositoryInMemory: EmailRepositoryInMemory;
let produtoRepositoryInMemory: ProdutoRepositoryInMemory;
let ingredientRepositoryInMemory: IngredientRepositoryInMemory;
let authorRepositoryInMemory: AuthorRepositoryInMemory;
let recipeRepositoryInMemory: RecipeRepositoryInMemory;
let createRecipeUseCase: CreateRecipeUseCase;
let createAuthorUseCase: CreateAuthorUseCase;
let createIngredientUseCase: CreateIngredientUseCase;
let createProdutoUseCase: CreateProdutoUseCase;
