import { ICreateEmailDTO } from "@modules/author/dtos/ICreateEmailDTO";
import { Email } from "@modules/author/infra/typeorm/entities/Email";

import { IEmailRepository } from "../IEmailRepository";

export class EmailRepositoryInMemory implements IEmailRepository {
    private emailsRepository: Email[] = [];

    async deleteEmailByEmail(e_mail: string): Promise<void> {
        const emailIndex = this.emailsRepository.findIndex(
            (email) => email.e_mail === e_mail
        );

        this.emailsRepository.splice(emailIndex, 1);
    }

    async create({ id, e_mail, author_name }: ICreateEmailDTO): Promise<Email> {
        const email = new Email();

        Object.assign(email, {
            id,
            e_mail,
            author_name,
        });

        this.emailsRepository.push(email);

        return email;
    }
    async list(): Promise<Email[]> {
        return this.emailsRepository;
    }
    async findEmailByE_mail(email: string): Promise<Email> {
        return this.emailsRepository.find((eMail) => eMail.e_mail === email);
    }
}
