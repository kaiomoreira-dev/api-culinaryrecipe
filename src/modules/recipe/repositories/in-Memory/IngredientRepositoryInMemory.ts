import { ICreateIngredientDTO } from "@modules/recipe/dtos/ICreateIngredientDTO";
import { Ingredient } from "@modules/recipe/infra/typeorm/entities/Ingredient";

import { IIngredientRepository } from "../IIngredientRepository";

export class IngredientRepositoryInMemory implements IIngredientRepository {
    repository: Ingredient[] = [];

    async create({
        id,
        produto_id,
        description,
        unity,
        weight,
    }: ICreateIngredientDTO): Promise<Ingredient> {
        const ingredient = new Ingredient();

        Object.assign(ingredient, {
            id,
            produto_id,
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

    async listByProdutoId(produto_id: string): Promise<Ingredient[]> {
        const ingredientByProdutoName: Ingredient[] = [];
        this.repository.map((ingredient) => {
            if (ingredient.produto_id === produto_id) {
                ingredientByProdutoName.push(ingredient);
            }
            return true;
        });
        return ingredientByProdutoName;
    }
    async findById(id: string): Promise<Ingredient> {
        return this.repository.find((ingredient) => ingredient.id === id);
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
    async updateIngredientById(
        id: string,
        produto_name?: string,
        weight?: number,
        unity?: number
    ): Promise<Ingredient> {
        const ingredientIndex = this.repository.findIndex(
            (ingredient) => ingredient.id === id
        );

        this.repository[ingredientIndex].produto_name = produto_name;
        this.repository[ingredientIndex].weight = weight;
        this.repository[ingredientIndex].unity = unity;

        return this.repository.find((ingredient) => ingredient.id === id);
    }
    async deleteIngredientById(id: string): Promise<void> {
        const ingredientIndex = this.repository.findIndex(
            (ingredient) => ingredient.id === id
        );

        this.repository.splice(ingredientIndex, 1);
    }
}
