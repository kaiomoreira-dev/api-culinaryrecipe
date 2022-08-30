import { ICreateIngredientDTO } from "@modules/recipe/dtos/ICreateIngredientDTO";
import { Ingredient } from "@modules/recipe/infra/typeorm/entities/Ingredient";

import { IIngredientRepository } from "../IIngredientRepository";

export class IngredientRepositoryInMemory implements IIngredientRepository {
    repository: Ingredient[] = [];

    create(data: ICreateIngredientDTO): Promise<Ingredient> {
        throw new Error("Method not implemented.");
    }
    list(): Promise<Ingredient[]> {
        throw new Error("Method not implemented.");
    }
    findIngredientByProdutoName(produto_name: string): Promise<Ingredient> {
        throw new Error("Method not implemented.");
    }
    findAllIngredientByProdutoName(
        produto_name: string
    ): Promise<Ingredient[]> {
        throw new Error("Method not implemented.");
    }
    findIngredientByProdutoNameWeightUnity(
        produto_name: string,
        weight: number,
        unity: number
    ): Promise<Ingredient> {
        throw new Error("Method not implemented.");
    }
    updateIngredientById(
        id: string,
        produto_name?: string,
        weight?: number,
        unity?: number
    ): Promise<Ingredient> {
        throw new Error("Method not implemented.");
    }
    deleteIngredientById(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
