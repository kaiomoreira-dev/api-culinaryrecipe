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
        private authorRepository: IAuthorRepository
    ) {}

    async execute({ id, name, whatsapp }: ICreateAuthorDTO): Promise<Author> {
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

        return author;
    }
}
