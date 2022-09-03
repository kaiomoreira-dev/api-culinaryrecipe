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
    async updateE_mailById(id: string, newE_mail: string): Promise<Email> {
        await this.repository
            .createQueryBuilder()
            .update()
            .set({ e_mail: newE_mail })
            .where("id = :id", { id })
            .execute();

        return this.repository.findOneBy({ e_mail: newE_mail });
    }
    async deleteEmailById(id: string): Promise<void> {
        await this.repository
            .createQueryBuilder()
            .delete()
            .where("id = :id", { id })
            .execute();
    }

    async findEmailById(id: string): Promise<Email> {
        return this.repository
            .createQueryBuilder()
            .where("id = :id", { id })
            .getOne();
    }
    async create({ id, e_mail, author_id }: ICreateEmailDTO): Promise<Email> {
        const email = this.repository.create({ id, e_mail, author_id });

        await this.repository.save(email);

        return email;
    }
    async list(): Promise<Email[]> {
        return this.repository.find();
    }
}
