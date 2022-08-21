import { ICreateIngredientDTO } from "@modules/recipe/dtos/ICreateIngredientDTO";
import { Ingredient } from "@modules/recipe/infra/typeorm/entities/Ingredient";
import { IIngredientRepository } from "@modules/recipe/repositories/IIngredientRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateIngredientUseCase {
    constructor(
        @inject("IngredientRepository")
        private ingredientRepository: IIngredientRepository
    ) {}

    async execute({
        name,
        description,
        unity,
        weight,
        animal,
        color,
    }: ICreateIngredientDTO): Promise<Ingredient> {
        const ingredient = await this.ingredientRepository.create({
            name,
            description,
            unity,
            weight,
            animal,
            color,
        });

        return ingredient;
    }
}
