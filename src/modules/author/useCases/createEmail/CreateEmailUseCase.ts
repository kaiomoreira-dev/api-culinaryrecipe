import { ICreateEmailDTO } from "@modules/author/dtos/ICreateEmailDTO";
import { Email } from "@modules/author/infra/typeorm/entities/Email";
import { IAuthorRepository } from "@modules/author/repositories/IAuthorRepository";
import { IEmailRepository } from "@modules/author/repositories/IEmailRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
export class CreateEmailUseCase {
    constructor(
        @inject("EmailRepository")
        private emailRepository: IEmailRepository,
        @inject("AuthorRepository")
        private authorRepository: IAuthorRepository
    ) {}

    async execute({
        id,
        e_mail,
        author_name,
    }: ICreateEmailDTO): Promise<Email> {
        // criar validação de author em autor
        const authorValidator = await this.authorRepository.findAuthorByName(
            author_name
        );
        if (!authorValidator) {
            throw new AppError("Author not found", 404);
        }

        const emailValidator = await this.emailRepository.findEmailByE_mail(
            e_mail
        );

        if (emailValidator) {
            throw new AppError("Email is already exists.", 401);
        }
        const email = await this.emailRepository.create({
            id,
            e_mail,
            author_name,
        });

        return email;
    }
}
