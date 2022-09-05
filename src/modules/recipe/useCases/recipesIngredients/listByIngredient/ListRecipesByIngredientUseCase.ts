import { IIngredientRepository } from "@modules/recipe/repositories/IIngredientRepository";
import { IRecipeRepository } from "@modules/recipe/repositories/IRecipeRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
export class ListRecipesByIngredientUseCase {
    constructor(
        @inject("RecipeRepository")
        private recipeRepository: IRecipeRepository,

        @inject("IngredientRepository")
        private ingredientRepository: IIngredientRepository
    ) {}

    async execute(ingredient_id: string): Promise<any> {
        const ingredientValidator = await this.ingredientRepository.findById(
            ingredient_id
        );

        if (!ingredientValidator) {
            throw new AppError("Ingredient not found", 404);
        }

        const recipes = await this.recipeRepository.listRecipesByIngredientId(
            ingredient_id
        );

        return recipes;
    }
}
