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

    async execute(produto_name: string): Promise<any> {
        const produtoValidator =
            await this.ingredientRepository.findAllIngredientByProdutoName(
                produto_name
            );

        if (!produtoValidator) {
            throw new AppError("Product not found", 404);
        }

        const recipes =
            await this.recipeRepository.listAllRecipeByIngredientProdutoName(
                produto_name
            );

        return recipes;
    }
}
