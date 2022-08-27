import { IEmailRepository } from "@modules/author/repositories/IEmailRepository";
import { IRecipeRepository } from "@modules/recipe/repositories/IRecipeRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListAuthorUseCase {
    constructor(
        @inject("EmailRepository")
        private emailRepository: IEmailRepository,
        @inject("RecipeRepository")
        private recipeRepository: IRecipeRepository
    ) {}
}
