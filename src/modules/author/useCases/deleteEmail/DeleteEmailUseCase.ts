import { IEmailRepository } from "@modules/author/repositories/IEmailRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
export class DeleteEmailUseCase {
    constructor(
        @inject("EmailRepository")
        private emailRepository: IEmailRepository
    ) {}

    async execute(id: string): Promise<null> {
        const emailValidator = await this.emailRepository.findById(id);

        if (!emailValidator) {
            throw new AppError("Email not found", 404);
        }

        await this.emailRepository.deleteById(emailValidator.id);

        return null;
    }
}
