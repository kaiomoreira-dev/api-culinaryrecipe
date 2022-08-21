import { IIngredientRepository } from "@modules/recipe/repositories/IIngredientRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateIngredient {
    constructor(
        @inject("IngredientRepository")
        private ingredientRepository: IIngredientRepository
    ) {}
}
