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
            throw new AppError("Author is already exists.", 401);
        }

        // criando author sem emails e recipes
        const author = await this.authorRepository.create({
            id,
            name,
            whatsapp,
        });

        //= ====================Email===============
        // arrEmails vazio
        const arrEmails: Email[] = [];

        // convertendo emails[] para string[]
        const emailsFormat = emails as unknown as string[];

        // for para fazer um passagem em cada email para validar
        for (const email of emailsFormat) {
            // buscando email
            const emailValidator = await this.emailRepository.findEmailByE_mail(
                email
            );
            console.log(emailValidator);
            // validando se email existe
            if (!emailValidator) {
                // deletar author se email nao for valido
                await this.authorRepository.deleteAuthorById(author.id);

                throw new AppError("Email not exists.", 404);
            }
            // validando se email existe para outro author
            if (emailValidator.author_name) {
                // deletar author se email nao for valido
                await this.authorRepository.deleteAuthorById(author.id);

                throw new AppError("Email already exists.", 401);
            }
            // enviando email existente para arrEmails[]
            arrEmails.push(emailValidator);

            // atualiza author_id
            emailValidator.author_name = author.name;

            // confirma author_id alterado
            await this.emailRepository.create(emailValidator);
        }
        //= ====================Recipe===============
        // arrRecipes[] vazio
        const arrRecipes: Recipe[] = [];

        // convertendo recipes[] para string[]
        const recipesFormat = recipes as unknown as string[];

        // for para fazer uma passagem em cada recipe para validar
        for (const recipeName of recipesFormat) {
            // buscando recipe pelo name
            const recipeValidator =
                await this.recipeRepository.findRecipeByName(recipeName);

            console.log(recipeValidator);
            // validando se recipe existe
            if (!recipeValidator) {
                // deletar author se recipe nao for valido
                await this.authorRepository.deleteAuthorById(author.id);

                throw new AppError("Recipe not exists.", 404);
            }
            // validando se existe para outro author
            if (recipeValidator.author_name) {
                // deletar author se email nao for valido
                await this.authorRepository.deleteAuthorById(author.id);

                throw new AppError("Recipe already exists.", 401);
            }
            // metodo para atualizat author_name em receita
            // usando recipe_id e author_name. Usamos um metodo
            // pois nao quero alterar o objeto inteiro, somente author_name
            const recipeUpdated =
                await this.recipeRepository.updateAuthorNameByRecipeId(
                    recipeValidator.id,
                    author.name
                );

            // enviando recipe existente para arrRecipes[]
            arrRecipes.push(recipeUpdated);
        }

        // atualiza recipes
        author.recipes = arrRecipes;

        // atualiza emails
        author.emails = arrEmails;

        // confirmar emails e recipes adicionado
        await this.authorRepository.create(author);

        return author;
    }
}
