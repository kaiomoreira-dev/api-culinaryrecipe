/* eslint-disable no-param-reassign */
import { ICreateAuthorDTO } from "@modules/author/dtos/ICreateAuthorDTO";
import { Author } from "@modules/author/infra/typeorm/entities/Author";
import { IRecipeRepository } from "@modules/recipe/repositories/IRecipeRepository";
import { inject, injectable } from "tsyringe";

import { IAuthorRepository } from "../IAuthorRepository";
import { IEmailRepository } from "../IEmailRepository";

@injectable()
export class AuthorRepositoryInMemory implements IAuthorRepository {
    authorRepository: Author[] = [];

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
    async deleteAuthorById(id: string): Promise<void> {
        const findAuthorIndex = this.authorRepository.findIndex(
            (author) => author.id === id
        );

        this.authorRepository.splice(findAuthorIndex, 1);
    }
}
