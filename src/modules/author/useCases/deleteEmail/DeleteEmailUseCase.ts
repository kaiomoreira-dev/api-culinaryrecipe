import { IEmailRepository } from "@modules/author/repositories/IEmailRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class DeleteEmailUseCase {
    constructor(
        @inject("EmailRepository")
        private emailRepository: IEmailRepository
    ) {}

    async execute(e_mail: string): Promise<void> {
        await this.emailRepository.deleteEmailByEmail(e_mail);
    }
}
