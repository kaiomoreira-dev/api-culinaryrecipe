import { faker } from "@faker-js/faker";
import { ICreateEmailDTO } from "@modules/author/dtos/ICreateEmailDTO";
import { EmailRepositoryInMemory } from "@modules/author/repositories/in-Memory/EmailRepositoryInMemory";

import { CreateEmailUseCase } from "./CreateEmailUseCase";

let emailRepositoryInMemory: EmailRepositoryInMemory;
let createEmailUseCase: CreateEmailUseCase;

describe("Create e-mail UseCase", () => {
    beforeEach(() => {
        emailRepositoryInMemory = new EmailRepositoryInMemory();
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
});
