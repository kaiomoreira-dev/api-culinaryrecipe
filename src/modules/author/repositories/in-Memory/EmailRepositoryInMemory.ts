/* eslint-disable prefer-const */
import { ICreateEmailDTO } from "@modules/author/dtos/ICreateEmailDTO";
import { Email } from "@modules/author/infra/typeorm/entities/Email";
import { inject, injectable } from "tsyringe";

import { IAuthorRepository } from "../IAuthorRepository";
import { IEmailRepository } from "../IEmailRepository";

@injectable()
export class EmailRepositoryInMemory implements IEmailRepository {
    private emailsRepository: Email[] = [];

    constructor(
        @inject("authorRepositoryInMemory")
        private authorRepositoryInMemory: IAuthorRepository
    ) {}

    async updateE_mailByE_mail(
        oldE_mail: string,
        newE_mail: string
    ): Promise<Email> {
        const emailIndex = this.emailsRepository.findIndex(
            (email) => email.e_mail === oldE_mail
        );

        this.emailsRepository[emailIndex].e_mail = newE_mail;

        const emailUpdated = this.emailsRepository.find(
            (email) => email.e_mail === newE_mail
        );

        return emailUpdated;
    }

    async deleteEmailByE_mail(e_mail: string): Promise<void> {
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

        const author = await this.authorRepositoryInMemory.findAuthorByName(
            author_name
        );

        author.emails.push(email);

        return email;
    }
    async list(): Promise<Email[]> {
        return this.emailsRepository;
    }
    async findEmailByE_mail(email: string): Promise<Email> {
        return this.emailsRepository.find((eMail) => eMail.e_mail === email);
    }
}
