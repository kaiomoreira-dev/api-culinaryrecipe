import { IIngredientRepository } from "@modules/recipe/repositories/IIngredientRepository";
import { IRecipeRepository } from "@modules/recipe/repositories/IRecipeRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListRecipesIngredientUseCase {
    constructor(
        @inject("RecipeRepository")
        private recipeRepository: IRecipeRepository,

        @inject("IngredientRepository")
        private ingredientRepository: IIngredientRepository
    ) {}
}
