/* eslint-disable @typescript-eslint/no-unused-vars */
import { faker } from "@faker-js/faker";
import { ICreateEmailDTO } from "@modules/author/dtos/ICreateEmailDTO";
import { AuthorRepositoryInMemory } from "@modules/author/repositories/in-Memory/AuthorRepositoryInMemory";
import { EmailRepositoryInMemory } from "@modules/author/repositories/in-Memory/EmailRepositoryInMemory";

import { AppError } from "@shared/errors/AppError";

import { CreateEmailUseCase } from "./CreateEmailUseCase";

let emailRepositoryInMemory: EmailRepositoryInMemory;
let authorRepositoryInMemory: AuthorRepositoryInMemory;
let createEmailUseCase: CreateEmailUseCase;

describe("Create e-mail UseCase", () => {
    beforeEach(() => {
        emailRepositoryInMemory = new EmailRepositoryInMemory();
        authorRepositoryInMemory = new AuthorRepositoryInMemory();

        createEmailUseCase = new CreateEmailUseCase(emailRepositoryInMemory);
    });

    it("should be able to create a new e-mail", async () => {
        const email: ICreateEmailDTO = {
            id: faker.datatype.uuid(),
            e_mail: faker.internet.email(),
        };

        const e_mail = await createEmailUseCase.execute(email);

        expect(e_mail).toHaveProperty("id");
    });

    it("should not be able to create a new e-mail with email already exists", async () => {
        const email1: ICreateEmailDTO = {
            id: faker.datatype.uuid(),
            e_mail: "test@test.com.br",
        };

        const email2: ICreateEmailDTO = {
            id: faker.datatype.uuid(),
            e_mail: "test@test.com.br",
        };

        await createEmailUseCase.execute(email1);

        await expect(createEmailUseCase.execute(email2)).rejects.toEqual(
            new AppError("Email is already exists.", 401)
        );
    });
});
