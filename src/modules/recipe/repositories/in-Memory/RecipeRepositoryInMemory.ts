import { ICreateRecipeDTO } from "@modules/recipe/dtos/ICreateRecipeDTO";
import { Recipe } from "@modules/recipe/infra/typeorm/entities/Recipe";
import { inject, injectable } from "tsyringe";
import { Repository } from "typeorm";

import dataSource from "@shared/infra/typeorm";

import { IIngredientRepository } from "../IIngredientRepository";
import { IRecipeRepository } from "../IRecipeRepository";

@injectable()
export class RecipeRepositoryInMemory implements IRecipeRepository {
    repository: Recipe[] = [];

    constructor(
        @inject("IngredientRepositoryInMemory")
        private ingredientRepository: IIngredientRepository
    ) {}

    async create({
        id,
        name,
        description,
        ingredients,
        author_name,
        time,
        difficulty,
        dish_type,
        additional_features,
        total_guests,
    }: ICreateRecipeDTO): Promise<Recipe> {
        const recipe = new Recipe();

        Object.assign(recipe, {
            id,
            name,
            description,
            ingredients,
            author_name,
            time,
            difficulty,
            dish_type,
            additional_features,
            total_guests,
        });

        this.repository;
    }
    list(): Promise<Recipe[]> {
        throw new Error("Method not implemented.");
    }
    listAllRecipeByIngredientProdutoName(
        produto_name: string
    ): Promise<Recipe[]> {
        throw new Error("Method not implemented.");
    }
    findRecipeById(id: string): Promise<Recipe> {
        throw new Error("Method not implemented.");
    }
    findRecipesByDifficulty(difficulty: string): Promise<Recipe[]> {
        throw new Error("Method not implemented.");
    }
    findRecipeByAuthor(author_name: string): Promise<Recipe> {
        throw new Error("Method not implemented.");
    }
    findRecipeByName(name: string): Promise<Recipe> {
        throw new Error("Method not implemented.");
    }
    updateTimeByRecipeId(id: string, time: number): Promise<Recipe> {
        throw new Error("Method not implemented.");
    }
    updateAuthorNameByRecipeId(
        id: string,
        author_name: string
    ): Promise<Recipe> {
        throw new Error("Method not implemented.");
    }
    deleteRecipeById(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
