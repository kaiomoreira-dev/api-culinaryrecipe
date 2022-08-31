import { ICreateAuthorDTO } from "@modules/author/dtos/ICreateAuthorDTO";
import { IAuthorRepository } from "@modules/author/repositories/IAuthorRepository";
import { Repository } from "typeorm";

import dataSource from "@shared/infra/typeorm";

import { Author } from "../entities/Author";

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
        return this.repository
            .createQueryBuilder("a")
            .leftJoinAndSelect("a.recipes", "recipes")
            .leftJoinAndSelect("a.emails", "emails")
            .getMany();
    }
    async findAuthorByName(name: string): Promise<Author> {
        return this.repository.findOneBy({ name });
    }
    async deleteAuthorById(id: string): Promise<void> {
        await this.repository
            .createQueryBuilder()
            .delete()
            .from(Author)
            .where("id = :id", { id })
            .execute();
    }
}
