import { Email } from "@modules/author/infra/typeorm/entities/Email";
import { IEmailRepository } from "@modules/author/repositories/IEmailRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateEmailByE_mailUseCase {
    constructor(
        @inject("EmailRepository")
        private emailRepository: IEmailRepository
    ) {}

    async handle(e_mail: string): Promise<Email> {
        // const emailValidator = await this.emailRepository.findEmailByE_mail()
    }
}
