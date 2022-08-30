import { AuthorRepositoryInMemory } from "@modules/author/repositories/in-Memory/AuthorRepositoryInMemory";
import { EmailRepositoryInMemory } from "@modules/author/repositories/in-Memory/EmailRepositoryInMemory";
import { RecipeRepositoryInMemory } from "@modules/recipe/repositories/in-Memory/RecipeRepositoryInMemory";

import { CreateAuthorUseCase } from "./CreateAuthorUseCase";

let emailRepositoryInMemory: EmailRepositoryInMemory;
let recipeRepositoryInMemory: RecipeRepositoryInMemory;
let authorRepositoryInMemory: AuthorRepositoryInMemory;
let createAuthorUseCase: CreateAuthorUseCase;

describe("Create author UseCase", () => {
    emailRepositoryInMemory = new EmailRepositoryInMemory();
    recipeRepositoryInMemory = new RecipeRepositoryInMemory();
    authorRepositoryInMemory = new AuthorRepositoryInMemory(
        emailRepositoryInMemory,
        recipeRepositoryInMemory
    );
    createAuthorUseCase = new CreateAuthorUseCase(authorRepositoryInMemory);
});
