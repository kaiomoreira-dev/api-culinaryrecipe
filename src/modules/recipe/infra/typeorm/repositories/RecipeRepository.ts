import { ICreateRecipeDTO } from "@modules/recipe/dtos/ICreateRecipeDTO";
import { IRecipeRepository } from "@modules/recipe/repositories/IRecipeRepository";
import { Repository } from "typeorm";

import dataSource from "@shared/infra/typeorm";

import { Recipe } from "../entities/Recipe";

export class RecipeRepository implements IRecipeRepository {
    repository: Repository<Recipe>;

    constructor() {
        this.repository = dataSource.getRepository(Recipe);
    }

    async create({
        id,
        description,
        name,
        additional_features,
        created_at,
        difficulty,
        dish_type,
        ingredients,
        time,
        total_guests,
        updated_at,
    }: ICreateRecipeDTO): Promise<Recipe> {
        const recipe = this.repository.create({
            id,
            description,
            name,
            additional_features,
            created_at,
            difficulty,
            dish_type,
            ingredients,
            time,
            total_guests,
            updated_at,
        });

        this.repository.save(recipe);

        return recipe;
    }
    async list(): Promise<Recipe[]> {
        return this.repository.find();
    }
    findRecipeById(id: string): Promise<Recipe> {
        return this.repository.findOneBy({ id });
    }

    updateRecipeById(id: string): Promise<Recipe> {
        throw new Error("Method not implemented.");
    }
    deleteRecipeById(id: string): Promise<Recipe> {
        throw new Error("Method not implemented.");
    }
}
