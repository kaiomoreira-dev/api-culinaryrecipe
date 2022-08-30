import { faker } from "@faker-js/faker";
import { ICreateAuthorDTO } from "@modules/author/dtos/ICreateAuthorDTO";
import { ICreateEmailDTO } from "@modules/author/dtos/ICreateEmailDTO";
import { AuthorRepositoryInMemory } from "@modules/author/repositories/in-Memory/AuthorRepositoryInMemory";
import { EmailRepositoryInMemory } from "@modules/author/repositories/in-Memory/EmailRepositoryInMemory";
import { IngredientRepositoryInMemory } from "@modules/recipe/repositories/in-Memory/IngredientRepositoryInMemory";
import { ProdutoRepositoryInMemory } from "@modules/recipe/repositories/in-Memory/ProdutoRepositoryInMemory";
import { RecipeRepositoryInMemory } from "@modules/recipe/repositories/in-Memory/RecipeRepositoryInMemory";
import { CreateIngredientUseCase } from "@modules/recipe/useCases/createIngredient/CreateIngredientUseCase";
import { CreateRecipeUseCase } from "@modules/recipe/useCases/createRecipe/CreateRecipeUseCase";

import { AppError } from "@shared/errors/AppError";

import { CreateEmailUseCase } from "../createEmail/CreateEmailUseCase";
import { CreateAuthorUseCase } from "./CreateAuthorUseCase";

let produtoRepositoryInMemory: ProdutoRepositoryInMemory;
let ingredientRepositoryInMemory: IngredientRepositoryInMemory;
let emailRepositoryInMemory: EmailRepositoryInMemory;
let recipeRepositoryInMemory: RecipeRepositoryInMemory;
let authorRepositoryInMemory: AuthorRepositoryInMemory;
let createAuthorUseCase: CreateAuthorUseCase;
let createEmailUseCase: CreateEmailUseCase;
let createRecipeUseCase: CreateRecipeUseCase;
let createIngredientUseCase: CreateIngredientUseCase;

describe("Create author UseCase", () => {
    produtoRepositoryInMemory = new ProdutoRepositoryInMemory();
    ingredientRepositoryInMemory = new IngredientRepositoryInMemory();
    emailRepositoryInMemory = new EmailRepositoryInMemory();
    recipeRepositoryInMemory = new RecipeRepositoryInMemory();
    authorRepositoryInMemory = new AuthorRepositoryInMemory(
        emailRepositoryInMemory,
        recipeRepositoryInMemory
    );
    createAuthorUseCase = new CreateAuthorUseCase(authorRepositoryInMemory);
    createEmailUseCase = new CreateEmailUseCase(
        emailRepositoryInMemory,
        authorRepositoryInMemory
    );
    createIngredientUseCase = new CreateIngredientUseCase(
        ingredientRepositoryInMemory,
        produtoRepositoryInMemory
    );
    createRecipeUseCase = new CreateRecipeUseCase(
        recipeRepositoryInMemory,
        ingredientRepositoryInMemory
    );

    it("should be able to create author", async () => {
        const author: ICreateAuthorDTO = {
            id: faker.datatype.uuid(),
            name: "Kaio Moreira",
            whatsapp: faker.phone.number(),
        };

        const authorCreated = await createAuthorUseCase.execute(author);

        expect(authorCreated).toHaveProperty("id");
    });
});
