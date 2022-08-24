import { Email } from "@modules/author/infra/typeorm/entities/Email";
import { IEmailRepository } from "@modules/author/repositories/IEmailRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListEmailsUseCase {
    constructor(
        @inject("EmailRepository")
        private emailRepository: IEmailRepository
    ) {}

    async execute(): Promise<Email[]> {
        const emails = await this.emailRepository.list();

        return emails;
    }
}
