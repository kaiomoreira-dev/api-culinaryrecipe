/* eslint-disable @typescript-eslint/no-unused-vars */
import { faker } from "@faker-js/faker";
import { ICreateAuthorDTO } from "@modules/author/dtos/ICreateAuthorDTO";
import { ICreateEmailDTO } from "@modules/author/dtos/ICreateEmailDTO";
import { AuthorRepositoryInMemory } from "@modules/author/repositories/in-Memory/AuthorRepositoryInMemory";
import { EmailRepositoryInMemory } from "@modules/author/repositories/in-Memory/EmailRepositoryInMemory";
import { RecipeRepositoryInMemory } from "@modules/recipe/repositories/in-Memory/RecipeRepositoryInMemory";

import { AppError } from "@shared/errors/AppError";

import { CreateAuthorUseCase } from "../createAuthor/CreateAuthorUseCase";
import { CreateEmailUseCase } from "./CreateEmailUseCase";

let recipeRepositoryInMemory: RecipeRepositoryInMemory;
let emailRepositoryInMemory: EmailRepositoryInMemory;
let authorRepositoryInMemory: AuthorRepositoryInMemory;
let createAuthorUseCase: CreateAuthorUseCase;
let createEmailUseCase: CreateEmailUseCase;

describe("Create e-mail UseCase", () => {
    beforeEach(() => {
        emailRepositoryInMemory = new EmailRepositoryInMemory();
        authorRepositoryInMemory = new AuthorRepositoryInMemory(
            emailRepositoryInMemory,
            recipeRepositoryInMemory
        );

        createAuthorUseCase = new CreateAuthorUseCase(authorRepositoryInMemory);

        createEmailUseCase = new CreateEmailUseCase(
            emailRepositoryInMemory,
            authorRepositoryInMemory
        );
    });

    it("should be able to create a new e-mail", async () => {
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

        const e_mail = await createEmailUseCase.execute(email);

        expect(e_mail).toHaveProperty("id");
    });

    it("should not be able to create a new e-mail with email already exists", async () => {
        const author1: ICreateAuthorDTO = {
            id: faker.datatype.uuid(),
            name: faker.name.fullName(),
            whatsapp: faker.phone.number(),
        };

        const author2: ICreateAuthorDTO = {
            id: faker.datatype.uuid(),
            name: faker.name.fullName(),
            whatsapp: faker.phone.number(),
        };

        const authorCreated1 = await createAuthorUseCase.execute(author1);

        const authorCreated2 = await createAuthorUseCase.execute(author2);

        const email1: ICreateEmailDTO = {
            id: faker.datatype.uuid(),
            e_mail: "test@test.com.br",
            author_id: authorCreated1.id,
        };

        const email2: ICreateEmailDTO = {
            id: faker.datatype.uuid(),
            e_mail: "test@test.com.br",
            author_id: authorCreated2.id,
        };

        await createEmailUseCase.execute(email1);

        await expect(createEmailUseCase.execute(email2)).rejects.toEqual(
            new AppError("Email is already exists.", 401)
        );
    });
});
