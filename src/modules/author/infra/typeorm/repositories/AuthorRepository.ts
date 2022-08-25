import { ICreateAuthorDTO } from "@modules/author/dtos/ICreateAuthorDTO";
import { IAuthorRepository } from "@modules/author/repositories/IAuthorRepository";
import { Repository } from "typeorm";

import dataSource from "@shared/infra/typeorm";

import { Author } from "../entities/Author";
import { Email } from "../entities/Email";

export class AuthorRepository implements IAuthorRepository {
    private repository: Repository<Author>;

    constructor() {
        this.repository = dataSource.getRepository(Author);
    }

    async create({
        id,
        name,
        whatsapp,
        emails,
        recipes,
    }: ICreateAuthorDTO): Promise<Author> {
        const author = this.repository.create({
            id,
            name,
            whatsapp,
            emails,
            recipes,
        });

        await this.repository.save(author);

        return author;
    }
    async list(): Promise<Author[]> {
        return this.repository.find();
    }
    async findAuthorByEmail(e_mail: string): Promise<Author> {
        const author = this.repository
            .createQueryBuilder("a")
            .leftJoinAndSelect("a.emails", "emails")
            .where("o.e_mail = :e_mail", { e_mail })
            .getOne();
        return author;
    }
    findAuthorByName(name: string): Promise<Author> {
        throw new Error("Method not implemented.");
    }
    deleteAuthorById(id: string): Promise<Author> {
        throw new Error("Method not implemented.");
    }
}
