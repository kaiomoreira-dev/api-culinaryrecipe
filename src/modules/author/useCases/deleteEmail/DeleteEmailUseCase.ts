import { IEmailRepository } from "@modules/author/repositories/IEmailRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
export class DeleteEmailUseCase {
    constructor(
        @inject("EmailRepository")
        private emailRepository: IEmailRepository
    ) {}

    async execute(e_mail: string): Promise<null> {
        const emailValidator = await this.emailRepository.findEmailByE_mail(
            e_mail
        );

        if (!emailValidator) {
            throw new AppError("Email not found", 404);
        }

        await this.emailRepository.deleteEmailByEmail(e_mail);

        return null;
    }
}
