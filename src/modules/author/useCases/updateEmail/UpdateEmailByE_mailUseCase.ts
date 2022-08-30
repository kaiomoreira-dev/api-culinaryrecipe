import { Email } from "@modules/author/infra/typeorm/entities/Email";
import { IEmailRepository } from "@modules/author/repositories/IEmailRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
export class UpdateEmailByE_mailUseCase {
    constructor(
        @inject("EmailRepository")
        private emailRepository: IEmailRepository
    ) {}

    async handle(e_mail: string): Promise<Email> {
        const emailValidator = await this.emailRepository.findEmailByE_mail(
            e_mail
        );

        if (!emailValidator) {
            throw new AppError("Email not found", 404);
        }

        const email = await this.emailRepository.updateE_mailByE_mail(e_mail);

        return email;
    }
}
