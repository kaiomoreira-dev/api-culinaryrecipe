/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
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

    constructor(
        // author tem fk de emails e recipes
        // instanciamos os repositorios para fazermos
        // a busca das listas relacionado pelo author_id em emails e recipe
        // assim conseguimos fazer o leftjoin de formar local ou em memoria
        @inject("EmailRepositoryInMemory")
        private emailRepositoryInMemory: IEmailRepository,

        @inject("RecipeRepositoryInMemory")
        private recipeRepositoryInMemory: IRecipeRepository
    ) {}

    async findById(id: string): Promise<Author> {
        const authorIndex = this.authorRepository.findIndex(
            async (author) => author.id === id
        );

        if (authorIndex === -1) {
            return null;
        }

        const emails = await this.emailRepositoryInMemory.listByAuthorId(id);

        const recipes = await this.recipeRepositoryInMemory.listByAuthorId(id);

        this.authorRepository[authorIndex].emails = emails;
        this.authorRepository[authorIndex].recipes = recipes;

        return this.authorRepository.find((author) => author.id === id);
    }

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
        // carregar authors
        this.authorRepository.map(async (author) => {
            // carregar lista de emails
            const emails = await this.emailRepositoryInMemory.listByAuthorId(
                author.id
            );
            // atualizar lista de emails em author
            author.emails = emails;

            // carregar a lista de recipes
            const recipes = await this.recipeRepositoryInMemory.listByAuthorId(
                author.id
            );

            // atualizar lista recipes em author
            author.recipes = recipes;

            return author;
        });
        console.log(JSON.stringify(this.authorRepository, null, 2));
        return this.authorRepository;
    }
    async findByName(name: string): Promise<Author> {
        return this.authorRepository.find((author) => author.name === name);
    }
    async deleteById(id: string): Promise<void> {
        const findAuthorIndex = this.authorRepository.findIndex(
            (author) => author.id === id
        );

        this.authorRepository.splice(findAuthorIndex, 1);
    }
}
