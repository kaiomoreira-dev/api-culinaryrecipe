import { faker } from "@faker-js/faker";
import { ICreateAuthorDTO } from "@modules/author/dtos/ICreateAuthorDTO";
import { AuthorRepositoryInMemory } from "@modules/author/repositories/in-Memory/AuthorRepositoryInMemory";
import { EmailRepositoryInMemory } from "@modules/author/repositories/in-Memory/EmailRepositoryInMemory";
import { IngredientRepositoryInMemory } from "@modules/recipe/repositories/in-Memory/IngredientRepositoryInMemory";
import { ProdutoRepositoryInMemory } from "@modules/recipe/repositories/in-Memory/ProdutoRepositoryInMemory";
import { RecipeRepositoryInMemory } from "@modules/recipe/repositories/in-Memory/RecipeRepositoryInMemory";
import { CreateIngredientUseCase } from "@modules/recipe/useCases/createIngredient/CreateIngredientUseCase";
import { CreateRecipeUseCase } from "@modules/recipe/useCases/createRecipe/CreateRecipeUseCase";

import { AppError } from "@shared/errors/AppError";

import { CreateAuthorUseCase } from "../createAuthor/CreateAuthorUseCase";
import { CreateEmailUseCase } from "../createEmail/CreateEmailUseCase";
import { UpdateAuthorUseCase } from "./UpdateAuthorUseCase";

let produtoRepositoryInMemory: ProdutoRepositoryInMemory;
let ingredientRepositoryInMemory: IngredientRepositoryInMemory;
let emailRepositoryInMemory: EmailRepositoryInMemory;
let recipeRepositoryInMemory: RecipeRepositoryInMemory;
let authorRepositoryInMemory: AuthorRepositoryInMemory;
let createAuthorUseCase: CreateAuthorUseCase;
let createEmailUseCase: CreateEmailUseCase;
let createRecipeUseCase: CreateRecipeUseCase;
let createIngredientUseCase: CreateIngredientUseCase;
let updateAuthorUseCase: UpdateAuthorUseCase;

describe("Update author UseCase", () => {
    beforeEach(() => {
        produtoRepositoryInMemory = new ProdutoRepositoryInMemory();
        ingredientRepositoryInMemory = new IngredientRepositoryInMemory();
        emailRepositoryInMemory = new EmailRepositoryInMemory();
        recipeRepositoryInMemory = new RecipeRepositoryInMemory();
        authorRepositoryInMemory = new AuthorRepositoryInMemory();
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
        updateAuthorUseCase = new UpdateAuthorUseCase(authorRepositoryInMemory);
    });

    it("should be able to update author using name", async () => {
        const author: ICreateAuthorDTO = {
            id: faker.datatype.uuid(),
            name: "Kaio Moreira",
            whatsapp: "3333336666",
        };

        const authorCreated = await createAuthorUseCase.execute(author);

        const { name } = authorCreated;

        const newName = "Kaio dos Santos Moreira";
        const whatsapp = "14998554799";

        const updateAuthor = await updateAuthorUseCase.execute(
            name,
            newName,
            whatsapp
        );

        expect(updateAuthor).toHaveProperty("id");
    });

    it("should not be able to update author using name invalid", async () => {
        const name = "fake-name";
        const newName = "Kaio dos Santos Moreira";
        const whatsapp = "14998554799";

        await expect(
            updateAuthorUseCase.execute(name, newName, whatsapp)
        ).rejects.toEqual(new AppError("Author not found", 404));
    });

    it("should not be able to update author with newName is already exists", async () => {
        const author: ICreateAuthorDTO = {
            id: faker.datatype.uuid(),
            name: "Kaio Moreira",
            whatsapp: "3333336666",
        };

        const authorCreated = await createAuthorUseCase.execute(author);

        const { name } = authorCreated;

        const newName = name;
        const whatsapp = "14998554799";

        await expect(
            updateAuthorUseCase.execute(name, newName, whatsapp)
        ).rejects.toEqual(new AppError("Author name already exists", 401));
    });
});
