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
    async deleteEmailByEmail(e_mail: string): Promise<Email> {
        await this.repository
            .createQueryBuilder()
            .delete()
            .where("e_mail = :e_mail", { e_mail })
            .execute();

        const email = this.repository.findOneBy({ e_mail });

        return email;
    }

    async findEmailByE_mail(e_mail: string): Promise<Email> {
        return this.repository
            .createQueryBuilder()
            .where("e_mail = :e_mail", { e_mail })
            .getOne();
    }
    async create({ id, e_mail, author_name }: ICreateEmailDTO): Promise<Email> {
        const email = this.repository.create({ id, e_mail, author_name });

        await this.repository.save(email);

        return email;
    }
    async list(): Promise<Email[]> {
        return this.repository.find();
    }
}
