import { ICreateEmailDTO } from "@modules/author/dtos/ICreateEmailDTO";
import { IEmailRepository } from "@modules/author/repositories/IEmailRepository";

import { Email } from "../entities/Email";

export class EmailRepository implements IEmailRepository {
    create(data: ICreateEmailDTO): Promise<Email> {
        throw new Error("Method not implemented.");
    }
    list(): Promise<Email[]> {
        throw new Error("Method not implemented.");
    }
}
