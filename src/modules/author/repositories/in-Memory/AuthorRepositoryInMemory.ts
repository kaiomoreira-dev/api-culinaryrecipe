/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
import { ICreateAuthorDTO } from "@modules/author/dtos/ICreateAuthorDTO";
import { Author } from "@modules/author/infra/typeorm/entities/Author";
import { Email } from "@modules/author/infra/typeorm/entities/Email";
import { Recipe } from "@modules/recipe/infra/typeorm/entities/Recipe";
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
        for (const author of this.authorRepository) {
            let arrEmails: Email[] = [];
            let arrRecipes: Recipe[] = [];

            const email = await this.emailRepositoryInMemory.findByAuthorId(
                author.id
            );
            // validar email

            // adicionar email encontrado na lista de emails
            arrEmails.push(email);

            // atualizar lista de emails em author
            author.emails = arrEmails;

            const recipe = await this.recipeRepositoryInMemory.findByAuthorId(
                author.id
            );

            // validar recipe

            // adicionar recipe encontrada na lista de recipes
            arrRecipes.push(recipe);

            // atualizar lista de recipes em author
            author.recipes = arrRecipes;
        }

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
