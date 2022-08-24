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
    async findEmailByE_mail(email: string): Promise<Email> {
        return this.repository.findOneBy(email);
    }
    async create({ id, email }: ICreateEmailDTO): Promise<Email> {
        const e_mail = this.repository.create({ id, email });

        await this.repository.save(e_mail);

        return e_mail;
    }
    async list(): Promise<Email[]> {
        return this.repository.find();
    }
}
