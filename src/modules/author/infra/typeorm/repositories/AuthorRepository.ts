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
    async findAuthorByWhatsapp(whatsapp: string): Promise<Author> {
        return this.repository
            .createQueryBuilder()
            .where("whatsapp = :whatsapp", { whatsapp })
            .getOne();
    }
    async updateNameAndWhatsappByName(
        name: string,
        new_name?: string,
        whatsapp?: string
    ): Promise<Author> {
        await this.repository
            .createQueryBuilder()
            .update()
            .set({ name: new_name, whatsapp })
            .where("name = :name", { name })
            .execute();

        return this.repository.findOneBy({ name: new_name });
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
        return this.repository
            .createQueryBuilder("a")
            .leftJoinAndSelect("a.recipes", "recipes")
            .leftJoinAndSelect("a.emails", "emails")
            .where("a.name = :name", { name })
            .getOne();
    }
    async deleteAuthorByName(name: string): Promise<void> {
        await this.repository
            .createQueryBuilder()
            .delete()
            .from(Author)
            .where("name = :name", { name })
            .execute();
    }
}
