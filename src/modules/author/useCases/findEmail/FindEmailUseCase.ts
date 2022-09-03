import { ICreateEmailDTO } from "@modules/author/dtos/ICreateEmailDTO";
import { Email } from "@modules/author/infra/typeorm/entities/Email";
import { IEmailRepository } from "@modules/author/repositories/IEmailRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
export class FindEmailUseCase {
    constructor(
        @inject("EmailRepository")
        private emailRepository: IEmailRepository
    ) {}

    async execute(e_mail: string): Promise<Email> {
        const emailValidator = await this.emailRepository.findByEmail(e_mail);
        if (!emailValidator) {
            throw new AppError("Email not found", 404);
        }

        return emailValidator;
    }
}
