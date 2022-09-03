import { Email } from "@modules/author/infra/typeorm/entities/Email";
import { IEmailRepository } from "@modules/author/repositories/IEmailRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
export class UpdateE_mailByE_mailUseCase {
    constructor(
        @inject("EmailRepository")
        private emailRepository: IEmailRepository
    ) {}

    async execute(oldE_mail: string, newE_mail: string): Promise<Email> {
        const emailValidator = await this.emailRepository.findByEmail(
            oldE_mail
        );

        if (!emailValidator) {
            throw new AppError("Email not found", 404);
        }

        const newEmailValidator = await this.emailRepository.findByEmail(
            newE_mail
        );

        if (newEmailValidator) {
            throw new AppError("Email already exists", 401);
        }

        const oldE_mailFormat = emailValidator.e_mail;

        const email = await this.emailRepository.updateE_mailByE_mail(
            oldE_mailFormat,
            newE_mail
        );

        return email;
    }
}
