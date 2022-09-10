/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable prefer-const */
import { ICreateAuthorDTO } from "@modules/author/dtos/ICreateAuthorDTO";
import { Email } from "@modules/author/infra/typeorm/entities/Email";
import { IAuthorRepository } from "@modules/author/repositories/IAuthorRepository";
import { IEmailRepository } from "@modules/author/repositories/IEmailRepository";
import { Recipe } from "@modules/recipe/infra/typeorm/entities/Recipe";
import { IRecipeRepository } from "@modules/recipe/repositories/IRecipeRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

interface IAuthorInfo {
    id: string;
    name: string;
    whatsapp: string;
    emails: Email[];
    recipes: Recipe[];
}

@injectable()
export class CreateAuthorUseCase {
    constructor(
        @inject("AuthorRepository")
        private authorRepository: IAuthorRepository,

        @inject("EmailRepository")
        private emailRepository: IEmailRepository,

        @inject("RecipeRepository")
        private recipeRepository: IRecipeRepository
    ) {}

    async execute(
        { id, name, whatsapp }: ICreateAuthorDTO,
        emails: string[],
        recipes?: string[]
    ): Promise<IAuthorInfo> {
        // buscando name de autor
        const authorValidator = await this.authorRepository.findByName(name);

        // validando se author existe
        if (authorValidator) {
            throw new AppError("Author is already exists.", 401);
        }

        const whatsappValidator = await this.authorRepository.findByWhatsapp(
            whatsapp
        );

        if (whatsappValidator) {
            throw new AppError("Whatsapp is already exists.", 401);
        }

        // criando author sem emails e recipes
        const author = await this.authorRepository.create({
            id,
            name,
            whatsapp,
        });

        // criar array de emails atualizado
        let arrEmails: Email[] = [];

        // verificar se existe cada email
        for (const id of emails) {
            const emailValidator = await this.emailRepository.findById(id);
            if (!emailValidator) {
                await this.authorRepository.deleteById(author.id);
                throw new AppError("Email is not exists.", 404);
            }

            const emailUpdated = await this.emailRepository.updateAuthorIdById(
                id,
                author.id
            );

            arrEmails.push(emailUpdated);
        }

        // cria array recipe atualizado
        let arrRecipe: Recipe[] = [];

        // verificar se existe cada recipe
        for (const id of recipes) {
            const recipeValidator = await this.recipeRepository.findById(id);
            if (!recipeValidator) {
                await this.authorRepository.deleteById(author.id);
                throw new AppError("Recipe is not exists.", 404);
            }

            const recipeUpdated =
                await this.recipeRepository.updateAuthorIdById(id, author.id);

            console.log(recipeUpdated);

            arrRecipe.push(recipeUpdated);
        }
        // atualizar author_id em email

        // atualizar author_id em recipe

        const authorInfo: IAuthorInfo = {
            id: author.id,
            name: author.name,
            whatsapp: author.whatsapp,
            emails: arrEmails,
            recipes: arrRecipe,
        };

        return authorInfo;
    }
}
