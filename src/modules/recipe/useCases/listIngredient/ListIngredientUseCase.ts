import { Ingredient } from "@modules/recipe/infra/typeorm/entities/Ingredient";
import { IIngredientRepository } from "@modules/recipe/repositories/IIngredientRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListIngredientUseCase {
    constructor(
        @inject("IngredientRepository")
        private ingredientRepository: IIngredientRepository
    ) {}

    async execute(): Promise<Ingredient[]> {
        const ingredients = await this.ingredientRepository.list();

        return ingredients;
    }
}
