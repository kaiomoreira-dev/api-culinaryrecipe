import { faker } from "@faker-js/faker";
import { ICreateEmailDTO } from "@modules/author/dtos/ICreateEmailDTO";
import { EmailRepositoryInMemory } from "@modules/author/repositories/in-Memory/EmailRepositoryInMemory";

import { CreateEmailUseCase } from "../createEmail.ts/CreateEmailUseCase";
import { ListEmailsUseCase } from "./ListEmailsUseCase";

let emailRepositoryInMemory: EmailRepositoryInMemory;
let createEmailUseCase: CreateEmailUseCase;
let listEmailsUseCase: ListEmailsUseCase;

describe("List e-mails UseCase", () => {
    beforeEach(() => {
        emailRepositoryInMemory = new EmailRepositoryInMemory();
        listEmailsUseCase = new ListEmailsUseCase(emailRepositoryInMemory);
        createEmailUseCase = new CreateEmailUseCase(emailRepositoryInMemory);
    });

    it("should be able to list e-mails", async () => {
        const email1: ICreateEmailDTO = {
            id: faker.datatype.uuid(),
            e_mail: faker.internet.email(),
        };
        const email2: ICreateEmailDTO = {
            id: faker.datatype.uuid(),
            e_mail: faker.internet.email(),
        };
        const email3: ICreateEmailDTO = {
            id: faker.datatype.uuid(),
            e_mail: faker.internet.email(),
        };

        await createEmailUseCase.execute(email1);
        await createEmailUseCase.execute(email2);
        await createEmailUseCase.execute(email3);

        const emails = await listEmailsUseCase.execute();

        console.log(emails);

        expect(emails[0]).toHaveProperty("id");
    });
});
