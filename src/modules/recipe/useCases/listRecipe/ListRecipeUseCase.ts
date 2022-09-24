import { Recipe } from "@modules/recipe/infra/typeorm/entities/Recipe";
import { IRecipeRepository } from "@modules/recipe/repositories/IRecipeRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListRecipeUseCase {
  constructor(
    @inject("RecipeRepository")
    private recipeRepository: IRecipeRepository
  ) {}

  async execute(): Promise<Recipe[]> {
    return this.recipeRepository.list();
  }
}
