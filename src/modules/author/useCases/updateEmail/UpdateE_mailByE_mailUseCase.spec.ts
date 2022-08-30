import { faker } from "@faker-js/faker";
import { ICreateAuthorDTO } from "@modules/author/dtos/ICreateAuthorDTO";
import { ICreateEmailDTO } from "@modules/author/dtos/ICreateEmailDTO";
import { AuthorRepositoryInMemory } from "@modules/author/repositories/in-Memory/AuthorRepositoryInMemory";
import { EmailRepositoryInMemory } from "@modules/author/repositories/in-Memory/EmailRepositoryInMemory";
import { RecipeRepositoryInMemory } from "@modules/recipe/repositories/in-Memory/RecipeRepositoryInMemory";

import { AppError } from "@shared/errors/AppError";

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

    it("should be able to update e_mail by e_mail", async () => {
        const author: ICreateAuthorDTO = {
            id: faker.datatype.uuid(),
            name: faker.name.fullName(),
            whatsapp: faker.phone.number(),
        };

        const authorCreated = await createAuthorUseCase.execute(author);

        const email: ICreateEmailDTO = {
            id: faker.datatype.uuid(),
            e_mail: "old-email@email.com",
            author_name: authorCreated.name,
        };

        const { e_mail } = await createEmailUseCase.execute(email);

        const oldE_mail = e_mail;

        const newE_mail = "new-email@email.com";

        const updateE_mail = await updateE_mailByE_mailUseCase.execute(
            oldE_mail,
            newE_mail
        );

        expect(updateE_mail).toHaveProperty("id");
        expect(updateE_mail).toHaveProperty("e_mail");
    });

    it("should not be able to update e_mail whit oldE_mail invalid", async () => {
        const oldE_mail = "fake-old-email@email.com";

        const newE_mail = "new-email@email.com";

        await expect(
            updateE_mailByE_mailUseCase.execute(oldE_mail, newE_mail)
        ).rejects.toEqual(new AppError("Email not found", 404));
    });

    it("should not be able to update e_mail with newE_mail already exists", async () => {
        const author: ICreateAuthorDTO = {
            id: faker.datatype.uuid(),
            name: faker.name.fullName(),
            whatsapp: faker.phone.number(),
        };

        const authorCreated = await createAuthorUseCase.execute(author);

        const email1: ICreateEmailDTO = {
            id: faker.datatype.uuid(),
            e_mail: "old1-email@email.com",
            author_name: authorCreated.name,
        };

        const email2: ICreateEmailDTO = {
            id: faker.datatype.uuid(),
            e_mail: "old2-email@email.com",
            author_name: authorCreated.name,
        };

        const { e_mail } = await createEmailUseCase.execute(email1);
        await createEmailUseCase.execute(email2);

        const oldE_mail = e_mail;

        const newE_mail = "old2-email@email.com";

        await expect(
            updateE_mailByE_mailUseCase.execute(oldE_mail, newE_mail)
        ).rejects.toEqual(new AppError("Email already exists", 401));
    });
});
