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

    async execute({
        name,
        description,
        ingredients,
        difficulty,
        dish_type,
        additional_features,
        time,
        total_guests,
    }: ICreateRecipeDTO): Promise<Recipe> {
        // array vazio de Ingredient
        let addIngredients: Ingredient[] = [];

        // convertendo Ingredient[] em um array de string[]
        const ingredientsFormatString = ingredients as unknown as string[];

        // enviando Ingredient para o array addIngredients
        // sem utilizar async!!
        for (const name of ingredientsFormatString) {
            // busca ingredient pelo nome
            const foundIngredient =
                await this.ingredientRepository.findIngredientByName(name);

            if (!foundIngredient) {
                throw new AppError("Ingredient not found", 404);
            }

            // recebe Ingredient buscado pelo nome para
            // o array de Ingredient[]
            addIngredients = [foundIngredient];
        }

        // criando recipe
        const recipe = await this.recipeRepository.create({
            name,
            description,
            difficulty,
            dish_type,
            additional_features,
            time,
            total_guests,
            ingredients: addIngredients,
        });

        return recipe;
    }
}
