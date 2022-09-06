/* eslint-disable prefer-const */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { IAuthorRepository } from "@modules/author/repositories/IAuthorRepository";
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
        private ingredientRepository: IIngredientRepository,

        @inject("AuthorRepository")
        private authorRepository: IAuthorRepository
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
            author_id,
        }: ICreateRecipeDTO,
        ingredients: string[]
    ): Promise<Recipe> {
        if (difficulty !== "easy" && "medium" && "hard") {
            throw new AppError("difficulty incorrect!", 401);
        }

        if (dish_type !== "appetizer" && "main course" && "dessert") {
            throw new AppError("dish_type incorrect!", 401);
        }

        // buscando name de autor
        const authorValidator = await this.authorRepository.findById(author_id);

        // validando se author existe
        if (!authorValidator) {
            throw new AppError("Author not found", 404);
        }

        // array vazio de Ingredient
        let addIngredients: Ingredient[] = [];

        // enviando Ingredient para o array addIngredients
        // sem utilizar async!!
        for (const id of ingredients) {
            // busca ingredient pelo nome
            const foundIngredient = await this.ingredientRepository.findById(
                id
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
            author_id,
        });

        return recipe;
    }
}
