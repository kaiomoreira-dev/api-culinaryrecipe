import { ICreateAuthorDTO } from "@modules/author/dtos/ICreateAuthorDTO";
import { Author } from "@modules/author/infra/typeorm/entities/Author";
import { IAuthorRepository } from "@modules/author/repositories/IAuthorRepository";
import { IEmailRepository } from "@modules/author/repositories/IEmailRepository";
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
        const authorValidator = await this.authorRepository.findAuthorByName(
            name
        );

        if (authorValidator) {
            throw new AppError("Email is already exists.", 401);
        }
    }
}
