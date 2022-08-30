import { ICreateIngredientDTO } from "@modules/recipe/dtos/ICreateIngredientDTO";
import { Ingredient } from "@modules/recipe/infra/typeorm/entities/Ingredient";

import { IIngredientRepository } from "../IIngredientRepository";

export class IngredientRepositoryInMemory implements IIngredientRepository {
    repository: Ingredient[] = [];

    async create({
        id,
        produto_name,
        description,
        unity,
        weight,
    }: ICreateIngredientDTO): Promise<Ingredient> {
        const ingredient = new Ingredient();

        Object.assign(ingredient, {
            id,
            produto_name,
            description,
            unity,
            weight,
        });

        this.repository.push(ingredient);

        return ingredient;
    }
    async list(): Promise<Ingredient[]> {
        return this.repository;
    }
    async findIngredientByProdutoName(
        produto_name: string
    ): Promise<Ingredient> {
        return this.repository.find(
            (ingredient) => ingredient.produto_name === produto_name
        );
    }
    async findAllIngredientByProdutoName(
        produto_name: string
    ): Promise<Ingredient[]> {
        const ingredientByProdutoName: Ingredient[] = [];
        this.repository.map((ingredient) => {
            if (ingredient.produto_name === produto_name) {
                ingredientByProdutoName.push(ingredient);
            }
            return true;
        });
        return ingredientByProdutoName;
    }
    async findIngredientByProdutoNameWeightUnity(
        produto_name: string,
        weight: number,
        unity: number
    ): Promise<Ingredient> {
        return this.repository.find(
            (ingredient) =>
                ingredient.produto_name === produto_name &&
                ingredient.weight === weight &&
                ingredient.unity === unity
        );
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
