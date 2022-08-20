import { IRecipeRepository } from "@modules/recipe/repositories/IRecipeRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateRecipeUseCase {
    constructor(
        @inject("RecipeRepository")
        private recipeRepository: IRecipeRepository
    ) {}
}
