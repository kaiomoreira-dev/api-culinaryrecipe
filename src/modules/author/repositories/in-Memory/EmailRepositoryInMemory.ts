import { ICreateEmailDTO } from "@modules/author/dtos/ICreateEmailDTO";
import { Email } from "@modules/author/infra/typeorm/entities/Email";

import { IEmailRepository } from "../IEmailRepository";

export class EmailRepositoryInMemory implements IEmailRepository {
    create(data: ICreateEmailDTO): Promise<Email> {
        throw new Error("Method not implemented.");
    }
    list(): Promise<Email[]> {
        throw new Error("Method not implemented.");
    }
    findEmailByE_mail(email: string): Promise<Email> {
        throw new Error("Method not implemented.");
    }
}
