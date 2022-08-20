import { ICreateRecipeDTO } from "@modules/recipe/dtos/ICreateRecipeDTO";
import { Recipe } from "@modules/recipe/infra/typeorm/entities/Recipe";
import { IRecipeRepository } from "@modules/recipe/repositories/IRecipeRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateRecipeUseCase {
    constructor(
        @inject("RecipeRepository")
        private recipeRepository: IRecipeRepository
    ) {}

    async execute({
        id,
        name,
        description,
        ingredients,
        difficulty,
        dish_type,
        additional_features,
        time,
        total_guests,
    }: ICreateRecipeDTO): Promise<Recipe> {
        const recipe = this.recipeRepository.create({
            id,
            name,
            description,
            ingredients,
            difficulty,
            dish_type,
            additional_features,
            time,
            total_guests,
        });

        return recipe;
    }
}
