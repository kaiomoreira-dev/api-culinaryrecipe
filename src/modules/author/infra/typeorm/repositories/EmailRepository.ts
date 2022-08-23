import { ICreateEmailDTO } from "@modules/author/dtos/ICreateEmailDTO";
import { IEmailRepository } from "@modules/author/repositories/IEmailRepository";
import { Repository } from "typeorm";

import dataSource from "@shared/infra/typeorm";

import { Email } from "../entities/Email";

export class EmailRepository implements IEmailRepository {
    private repository: Repository<Email>;

    constructor() {
        this.repository = dataSource.getRepository(Email);
    }
    create(data: ICreateEmailDTO): Promise<Email> {
        throw new Error("Method not implemented.");
    }
    list(): Promise<Email[]> {
        throw new Error("Method not implemented.");
    }
}
