/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { IAuthorRepository } from "@modules/author/repositories/IAuthorRepository";
import { IEmailRepository } from "@modules/author/repositories/IEmailRepository";
import { IRecipeRepository } from "@modules/recipe/repositories/IRecipeRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
export class DeleteAuthorUseCase {
    constructor(
        @inject("AuthorRepository")
        private authorRepository: IAuthorRepository,

        @inject("EmailRepository")
        private emailRepository: IEmailRepository,

        @inject("RecipeRepository")
        private recipeRepository: IRecipeRepository
    ) {}

    async execute(id: string): Promise<null> {
        const authorValidator = await this.authorRepository.findById(id);

        if (!authorValidator) {
            throw new AppError("Author not found", 404);
        }

        const { emails, recipes } = authorValidator;

        for (const email of emails) {
            await this.emailRepository.deleteById(email.id);
        }

        const [ids] = recipes.map((recipe) => {
            const ids = recipe.ingredients.map((ingredient) => {
                return ingredient.id;
            });

            return ids;
        });
        for (const recipe of recipes) {
            await this.recipeRepository.deleteRecipe(recipe.id, ids);
        }

        await this.authorRepository.deleteById(authorValidator.id);

        return null;
    }
}
