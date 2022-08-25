/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
/* eslint-disable prefer-const */
import { ICreateAuthorDTO } from "@modules/author/dtos/ICreateAuthorDTO";
import { Author } from "@modules/author/infra/typeorm/entities/Author";
import { Email } from "@modules/author/infra/typeorm/entities/Email";
import { IAuthorRepository } from "@modules/author/repositories/IAuthorRepository";
import { IEmailRepository } from "@modules/author/repositories/IEmailRepository";
import { Recipe } from "@modules/recipe/infra/typeorm/entities/Recipe";
import { IRecipeRepository } from "@modules/recipe/repositories/IRecipeRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

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

    async execute({
        id,
        name,
        whatsapp,
        emails,
        recipes,
    }: ICreateAuthorDTO): Promise<Author> {
        // buscando name de autor
        const authorValidator = await this.authorRepository.findAuthorByName(
            name
        );

        // validando se author existe
        if (authorValidator) {
            throw new AppError("Email is already exists.", 401);
        }

        // arrEmails vazio
        let arrEmails: Email[] = [];

        // convertendo emails[] para string[]
        const emailsFormat = emails as unknown as string[];

        // for para fazer um passagem em cada email para validar
        for (const email of emailsFormat) {
            // buscando email
            const emailValidator = await this.emailRepository.findEmailByE_mail(
                email
            );
            // validando se email existe
            if (!emailValidator) {
                throw new AppError("Email not exists.", 404);
            }
            // enviando email existente para arrEmails[]
            arrEmails = [emailValidator];
        }

        // arrRecipes[] vazio
        let arrRecipes: Recipe[] = [];

        // convertendo recipes[] para string[]
        const recipesFormat = recipes as unknown as string[];

        // for para fazer uma passagem em cada recipe para validar
        for (const recipeName of recipesFormat) {
            // buscando recipe pelo name
            const recipeValidator =
                await this.recipeRepository.findRecipeByName(recipeName);

            // validando se recipe existe
            if (!recipeValidator) {
                throw new AppError("Recipe not exists.", 404);
            }
            // enviando recipe existente para arrRecipes[]
            arrRecipes = [recipeValidator];
        }

        // criando author
        const author = await this.authorRepository.create({
            id,
            name,
            whatsapp,
            emails: arrEmails,
            recipes: arrRecipes,
        });

        return author;
    }
}
