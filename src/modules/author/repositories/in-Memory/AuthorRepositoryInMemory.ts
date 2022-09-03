/* eslint-disable no-param-reassign */
import { ICreateAuthorDTO } from "@modules/author/dtos/ICreateAuthorDTO";
import { Author } from "@modules/author/infra/typeorm/entities/Author";

import { IAuthorRepository } from "../IAuthorRepository";

export class AuthorRepositoryInMemory implements IAuthorRepository {
    authorRepository: Author[] = [];

    async findByWhatsapp(whatsapp: string): Promise<Author> {
        return this.authorRepository.find(
            (author) => author.whatsapp === whatsapp
        );
    }

    async updateById(
        id: string,
        new_name: string,
        whatsapp: string
    ): Promise<Author> {
        const authorIndex = this.authorRepository.findIndex(
            (author) => author.id === id
        );

        this.authorRepository[authorIndex].name = new_name;
        this.authorRepository[authorIndex].whatsapp = whatsapp;

        return this.authorRepository.find((author) => author.id === id);
    }

    async create({
        id,
        name,
        whatsapp,
        emails,
        recipes,
    }: ICreateAuthorDTO): Promise<Author> {
        const author = new Author();

        Object.assign(author, {
            id,
            name,
            whatsapp,
            emails,
            recipes,
        });

        this.authorRepository.push(author);

        return author;
    }
    async list(): Promise<Author[]> {
        return this.authorRepository;
    }
    async findrByName(name: string): Promise<Author> {
        return this.authorRepository.find((author) => author.name === name);
    }
    async deleteById(id: string): Promise<void> {
        const findAuthorIndex = this.authorRepository.findIndex(
            (author) => author.id === id
        );

        this.authorRepository.splice(findAuthorIndex, 1);
    }
}
