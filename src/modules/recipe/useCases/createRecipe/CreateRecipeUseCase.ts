/* eslint-disable prefer-const */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { ICreateRecipeDTO } from "@modules/recipe/dtos/ICreateRecipeDTO";
import { Ingredient } from "@modules/recipe/infra/typeorm/entities/Ingredient";
import { Recipe } from "@modules/recipe/infra/typeorm/entities/Recipe";
import { IIngredientRepository } from "@modules/recipe/repositories/IIngredientRepository";
import { IRecipeRepository } from "@modules/recipe/repositories/IRecipeRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
export class CreateRecipeUseCase {
    constructor(
        @inject("RecipeRepository")
        private recipeRepository: IRecipeRepository,

        @inject("IngredientRepository")
        private ingredientRepository: IIngredientRepository
    ) {}

    async execute(
        {
            id,
            name,
            description,
            difficulty,
            dish_type,
            additional_features,
            time,
            total_guests,
            author_name,
        }: ICreateRecipeDTO,
        ingredients: string[]
    ): Promise<Recipe> {
        if (difficulty !== "easy" && "medium" && "hard") {
            throw new AppError("difficulty incorrect!", 401);
        }

        if (dish_type !== "appetizer" && "main course" && "dessert") {
            throw new AppError("dish_type incorrect!", 401);
        }
        // array vazio de Ingredient
        let addIngredients: Ingredient[] = [];

        // enviando Ingredient para o array addIngredients
        // sem utilizar async!!
        for (const name of ingredients) {
            // busca ingredient pelo nome
            const foundIngredient =
                await this.ingredientRepository.findIngredientByProdutoName(
                    name
                );

            if (!foundIngredient) {
                throw new AppError("Ingredient not found", 404);
            }

            // recebe Ingredient buscado pelo nome para
            // o array de Ingredient[]
            addIngredients.push(foundIngredient);
        }

        if (addIngredients.length < 2) {
            throw new AppError("Ingredients insufficient!", 401);
        }

        // criando recipe
        const recipe = await this.recipeRepository.create({
            id,
            name,
            description,
            difficulty,
            dish_type,
            additional_features,
            time,
            total_guests,
            ingredients: addIngredients,
            author_name,
        });

        return recipe;
    }
}
