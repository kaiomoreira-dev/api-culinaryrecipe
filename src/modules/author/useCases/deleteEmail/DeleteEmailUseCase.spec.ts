import { faker } from "@faker-js/faker";
import { ICreateAuthorDTO } from "@modules/author/dtos/ICreateAuthorDTO";
import { ICreateEmailDTO } from "@modules/author/dtos/ICreateEmailDTO";
import { AuthorRepositoryInMemory } from "@modules/author/repositories/in-Memory/AuthorRepositoryInMemory";
import { EmailRepositoryInMemory } from "@modules/author/repositories/in-Memory/EmailRepositoryInMemory";
import { IngredientRepositoryInMemory } from "@modules/recipe/repositories/in-Memory/IngredientRepositoryInMemory";
import { RecipeRepositoryInMemory } from "@modules/recipe/repositories/in-Memory/RecipeRepositoryInMemory";

import { AppError } from "@shared/errors/AppError";

import { CreateAuthorUseCase } from "../createAuthor/CreateAuthorUseCase";
import { CreateEmailUseCase } from "../createEmail/CreateEmailUseCase";
import { DeleteEmailUseCase } from "./DeleteEmailUseCase";

let ingredientRepositoryInMemory: IngredientRepositoryInMemory;
let recipeRepositoryInMemory: RecipeRepositoryInMemory;
let emailRepositoryInMemory: EmailRepositoryInMemory;
let authorRepositoryInMemory: AuthorRepositoryInMemory;
let createAuthorUseCase: CreateAuthorUseCase;
let createEmailUseCase: CreateEmailUseCase;
let deleteEmailUseCase: DeleteEmailUseCase;

describe("Delete e-mail UseCase", () => {
    beforeEach(() => {
        emailRepositoryInMemory = new EmailRepositoryInMemory();
        ingredientRepositoryInMemory = new IngredientRepositoryInMemory();
        recipeRepositoryInMemory = new RecipeRepositoryInMemory(
            ingredientRepositoryInMemory
        );
        authorRepositoryInMemory = new AuthorRepositoryInMemory(
            emailRepositoryInMemory,
            recipeRepositoryInMemory
        );
        createAuthorUseCase = new CreateAuthorUseCase(authorRepositoryInMemory);
        createEmailUseCase = new CreateEmailUseCase(
            emailRepositoryInMemory,
            authorRepositoryInMemory
        );
        deleteEmailUseCase = new DeleteEmailUseCase(emailRepositoryInMemory);
    });

    it("should be able to delete e-mail", async () => {
        const author: ICreateAuthorDTO = {
            id: faker.datatype.uuid(),
            name: faker.name.fullName(),
            whatsapp: faker.phone.number(),
        };

        const authorCreated = await createAuthorUseCase.execute(author);

        const email: ICreateEmailDTO = {
            id: faker.datatype.uuid(),
            e_mail: faker.internet.email(),
            author_id: authorCreated.id,
        };

        const { id } = await createEmailUseCase.execute(email);

        const deleteEmail = await deleteEmailUseCase.execute(id);

        expect(deleteEmail).toEqual(null);
    });

    it("should not be able to delete e-mail with invalid id", async () => {
        const id = "f060c7bc-4539-4bd8-a3ac-f4b7d98f54d6";

        await expect(deleteEmailUseCase.execute(id)).rejects.toEqual(
            new AppError("Email not found", 404)
        );
    });
});
