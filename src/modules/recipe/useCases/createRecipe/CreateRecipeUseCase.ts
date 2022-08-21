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

        return recipe;
    }
}
