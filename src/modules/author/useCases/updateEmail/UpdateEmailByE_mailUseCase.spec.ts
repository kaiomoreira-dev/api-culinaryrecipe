import { AuthorRepositoryInMemory } from "@modules/author/repositories/in-Memory/AuthorRepositoryInMemory";
import { EmailRepositoryInMemory } from "@modules/author/repositories/in-Memory/EmailRepositoryInMemory";
import { RecipeRepositoryInMemory } from "@modules/recipe/repositories/in-Memory/RecipeRepositoryInMemory";

import { CreateAuthorUseCase } from "../createAuthor/CreateAuthorUseCase";
import { CreateEmailUseCase } from "../createEmail/CreateEmailUseCase";
import { UpdateE_mailByE_mailUseCase } from "./UpdateEmailByE_mailUseCase";

let emailRepositoryInMemory: EmailRepositoryInMemory;
let authorRepositoryInMemory: AuthorRepositoryInMemory;
let recipeRepositoryInMemory: RecipeRepositoryInMemory;
let createAuthorUseCase: CreateAuthorUseCase;
let createEmailUseCase: CreateEmailUseCase;
let updateE_mailByE_mailUseCase: UpdateE_mailByE_mailUseCase;

describe("Update e-mail UseCase", () => {
    beforeEach(() => {
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

        updateE_mailByE_mailUseCase = new UpdateE_mailByE_mailUseCase(
            emailRepositoryInMemory
        );
    });
});
