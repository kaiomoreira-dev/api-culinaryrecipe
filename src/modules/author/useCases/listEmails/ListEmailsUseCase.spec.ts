import { faker } from "@faker-js/faker";
import { ICreateAuthorDTO } from "@modules/author/dtos/ICreateAuthorDTO";
import { ICreateEmailDTO } from "@modules/author/dtos/ICreateEmailDTO";
import { AuthorRepositoryInMemory } from "@modules/author/repositories/in-Memory/AuthorRepositoryInMemory";
import { EmailRepositoryInMemory } from "@modules/author/repositories/in-Memory/EmailRepositoryInMemory";
import { IngredientRepositoryInMemory } from "@modules/recipe/repositories/in-Memory/IngredientRepositoryInMemory";
import { RecipeRepositoryInMemory } from "@modules/recipe/repositories/in-Memory/RecipeRepositoryInMemory";

import { CreateAuthorUseCase } from "../createAuthor/CreateAuthorUseCase";
import { CreateEmailUseCase } from "../createEmail/CreateEmailUseCase";
import { ListEmailsUseCase } from "./ListEmailsUseCase";

let ingredientRepositoryInMemory: IngredientRepositoryInMemory;
let recipeRepositoryInMemory: RecipeRepositoryInMemory;
let emailRepositoryInMemory: EmailRepositoryInMemory;
let createEmailUseCase: CreateEmailUseCase;
let listEmailsUseCase: ListEmailsUseCase;
let authorRepositoryInMemory: AuthorRepositoryInMemory;
let createAuthorUseCase: CreateAuthorUseCase;

describe("List e-mails UseCase", () => {
    beforeEach(() => {
        ingredientRepositoryInMemory = new IngredientRepositoryInMemory();
        recipeRepositoryInMemory = new RecipeRepositoryInMemory(
            ingredientRepositoryInMemory
        );
        emailRepositoryInMemory = new EmailRepositoryInMemory();

        authorRepositoryInMemory = new AuthorRepositoryInMemory(
            emailRepositoryInMemory,
            recipeRepositoryInMemory
        );
        createAuthorUseCase = new CreateAuthorUseCase(authorRepositoryInMemory);
        listEmailsUseCase = new ListEmailsUseCase(emailRepositoryInMemory);
        createEmailUseCase = new CreateEmailUseCase(
            emailRepositoryInMemory,
            authorRepositoryInMemory
        );
    });

    it("should be able to list e-mails", async () => {
        const author: ICreateAuthorDTO = {
            id: faker.datatype.uuid(),
            name: faker.name.fullName(),
            whatsapp: faker.phone.number(),
        };

        const authorCreated = await createAuthorUseCase.execute(author);

        const email1: ICreateEmailDTO = {
            id: faker.datatype.uuid(),
            e_mail: faker.internet.email(),
            author_id: authorCreated.id,
        };
        const email2: ICreateEmailDTO = {
            id: faker.datatype.uuid(),
            e_mail: faker.internet.email(),
            author_id: authorCreated.id,
        };
        const email3: ICreateEmailDTO = {
            id: faker.datatype.uuid(),
            e_mail: faker.internet.email(),
            author_id: authorCreated.id,
        };

        await createEmailUseCase.execute(email1);
        await createEmailUseCase.execute(email2);
        await createEmailUseCase.execute(email3);

        const emails = await listEmailsUseCase.execute();

        expect(emails[0]).toHaveProperty("id");
    });
});
