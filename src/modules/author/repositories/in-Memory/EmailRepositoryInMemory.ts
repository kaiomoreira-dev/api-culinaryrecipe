import { ICreateEmailDTO } from "@modules/author/dtos/ICreateEmailDTO";
import { Email } from "@modules/author/infra/typeorm/entities/Email";

import { IEmailRepository } from "../IEmailRepository";

export class EmailRepositoryInMemory implements IEmailRepository {
    private repository: Email[] = [];

    async create({ id, e_mail }: ICreateEmailDTO): Promise<Email> {
        const email = new Email();

        Object.assign(email, {
            id,
            email,
        });

        this.repository.push(email);

        return email;
    }
    async list(): Promise<Email[]> {
        return this.repository;
    }
    async findEmailByE_mail(email: string): Promise<Email> {
        return this.repository.find((eMail) => eMail.e_mail === email);
    }
}
