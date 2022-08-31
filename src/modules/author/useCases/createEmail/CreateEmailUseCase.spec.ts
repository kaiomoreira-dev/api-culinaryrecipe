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

let emailRepositoryInMemory: EmailRepositoryInMemory;
let authorRepositoryInMemory: AuthorRepositoryInMemory;
let recipeRepositoryInMemory: RecipeRepositoryInMemory;
let createAuthorUseCase: CreateAuthorUseCase;
let createEmailUseCase: CreateEmailUseCase;

describe("Create e-mail UseCase", () => {
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
            author_name: authorCreated.name,
        };

        const e_mail = await createEmailUseCase.execute(email);

        expect(e_mail).toHaveProperty("id");
    });

    it("should not be able to create a new e-mail with email already exists", async () => {
        const author: ICreateAuthorDTO = {
            id: faker.datatype.uuid(),
            name: faker.name.fullName(),
            whatsapp: faker.phone.number(),
        };

        const authorCreated = await createAuthorUseCase.execute(author);

        const email1: ICreateEmailDTO = {
            id: faker.datatype.uuid(),
            e_mail: "test@test.com.br",
            author_name: authorCreated.name,
        };

        const email2: ICreateEmailDTO = {
            id: faker.datatype.uuid(),
            e_mail: "test@test.com.br",
            author_name: authorCreated.name,
        };

        const e_mail1 = await createEmailUseCase.execute(email1);

        await expect(createEmailUseCase.execute(email2)).rejects.toEqual(
            new AppError("Email is already exists.", 401)
        );
    });

    it("should not be able to create a new e-mail with author not found", async () => {
        const email: ICreateEmailDTO = {
            id: faker.datatype.uuid(),
            e_mail: "test@test.com.br",
            author_name: faker.name.fullName(),
        };

        await expect(createEmailUseCase.execute(email)).rejects.toEqual(
            new AppError("Author not found", 404)
        );
    });
});
