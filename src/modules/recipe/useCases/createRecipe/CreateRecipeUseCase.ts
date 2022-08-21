/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { ICreateRecipeDTO } from "@modules/recipe/dtos/ICreateRecipeDTO";
import { Ingredient } from "@modules/recipe/infra/typeorm/entities/Ingredient";
import { Recipe } from "@modules/recipe/infra/typeorm/entities/Recipe";
import { IIngredientRepository } from "@modules/recipe/repositories/IIngredientRepository";
import { IRecipeRepository } from "@modules/recipe/repositories/IRecipeRepository";
import { inject, injectable } from "tsyringe";

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
        author,
    }: ICreateRecipeDTO): Promise<Recipe> {
        // criando recipe
        const recipe = await this.recipeRepository.create({
            name,
            description,
            difficulty,
            dish_type,
            additional_features,
            time,
            total_guests,
            author,
        });

        // array vazio de Ingredient
        let addIngredients: Ingredient[] = [];

        // convertendo Ingredient[] em um array de string[]
        const ingredientsFormatString = ingredients as unknown as string[];

        // enviando Ingredient para o array addIngredients
        // sem utilizar async!!
        for (const name of ingredientsFormatString) {
            const foundIngredient =
                await this.ingredientRepository.findIngredientByName(name);

            addIngredients = [foundIngredient];
        }

        // atualizando ingredients em recipe
        recipe.ingredients = addIngredients;

        // salvando atualizações de ingredients em recipe
        await this.recipeRepository.create(recipe);

        return recipe;
    }
}
