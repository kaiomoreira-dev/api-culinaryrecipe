import { ICreateIngredientsDTO } from "@modules/recipe/dtos/ICreateIngredientsDTO";
import { IIngredientRepository } from "@modules/recipe/repositories/IIngredientRepository";

import { Ingredient } from "../entities/Ingredient";

export class IngredientRepository implements IIngredientRepository {
    create(data: ICreateIngredientsDTO): Promise<Ingredient> {
        throw new Error("Method not implemented.");
    }
    list(): Promise<Ingredient[]> {
        throw new Error("Method not implemented.");
    }
    findAllIngredientsByAnimal(animal: string): Promise<Ingredient[]> {
        throw new Error("Method not implemented.");
    }
    findIgredientById(id: string): Promise<Ingredient> {
        throw new Error("Method not implemented.");
    }
    findAllIngredientsByName(name: string): Promise<Ingredient[]> {
        throw new Error("Method not implemented.");
    }
    updateAnimalById(id: string): Promise<Ingredient> {
        throw new Error("Method not implemented.");
    }
    deleteIngredientById(id: string): Promise<Ingredient> {
        throw new Error("Method not implemented.");
    }
}
