import { ICreateEmailDTO } from "@modules/author/dtos/ICreateEmailDTO";
import { Email } from "@modules/author/infra/typeorm/entities/Email";
import { IEmailRepository } from "@modules/author/repositories/IEmailRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
export class CreateEmailUseCase {
    constructor(
        @inject("EmailRepository")
        private emailRepository: IEmailRepository
    ) {}

    async execute({ id, e_mail }: ICreateEmailDTO): Promise<Email> {
        const emailValidator = await this.emailRepository.findEmailByE_mail(
            e_mail
        );

        if (emailValidator) {
            throw new AppError("Email is already exists.", 401);
        }
        const email = await this.emailRepository.create({ id, e_mail });

        return email;
    }
}
