/* eslint-disable no-param-reassign */
import { ICreateAuthorDTO } from "@modules/author/dtos/ICreateAuthorDTO";
import { Author } from "@modules/author/infra/typeorm/entities/Author";

import { IAuthorRepository } from "../IAuthorRepository";

export class AuthorRepositoryInMemory implements IAuthorRepository {
    authorRepository: Author[] = [];

    async findAuthorByWhatsapp(whatsapp: string): Promise<Author> {
        return this.authorRepository.find(
            (author) => author.whatsapp === whatsapp
        );
    }

    async updateNameAndWhatsappByName(
        name: string,
        new_name: string,
        whatsapp: string
    ): Promise<Author> {
        const authorIndex = this.authorRepository.findIndex(
            (author) => author.name === name
        );

        this.authorRepository[authorIndex].name = new_name;
        this.authorRepository[authorIndex].whatsapp = whatsapp;

        return this.authorRepository.find((author) => author.name === new_name);
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
    async findAuthorByName(name: string): Promise<Author> {
        return this.authorRepository.find((author) => author.name === name);
    }
    async deleteAuthorByName(name: string): Promise<void> {
        const findAuthorIndex = this.authorRepository.findIndex(
            (author) => author.name === name
        );

        this.authorRepository.splice(findAuthorIndex, 1);
    }
}
