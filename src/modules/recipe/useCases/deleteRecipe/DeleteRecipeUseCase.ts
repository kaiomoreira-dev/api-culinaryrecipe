import { IRecipeRepository } from "@modules/recipe/repositories/IRecipeRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
export class DeleteRecipeUseCase {
  constructor(
    @inject("RecipeRepository")
    private recipeRepository: IRecipeRepository
  ) {}

  async execute(recipe_id: string): Promise<null> {
    const findRecipe = await this.recipeRepository.findById(recipe_id);

    if (!findRecipe) {
      throw new AppError("Recipe not found", 404);
    }

    const ingredient_ids = findRecipe.ingredients.map(
      (ingredient) => ingredient.id
    );

    await this.recipeRepository.deleteRecipeById(findRecipe.id, ingredient_ids);

    return null;
  }
}
