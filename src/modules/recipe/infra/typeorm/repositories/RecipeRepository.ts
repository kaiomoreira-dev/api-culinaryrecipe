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
    async findRecipesByDifficulty(difficulty: string): Promise<Recipe[]> {
        return this.repository.find({ where: { difficulty } });
    }
    async updateRecipeById(id: string, time: number): Promise<Recipe> {
        await this.repository
            .createQueryBuilder()
            .update()
            .where("id = :id", { id })
            .set({ time })
            .execute();

        const recipe = await this.repository.findOneBy({ id });

        return recipe;
    }
    deleteRecipeById(id: string): Promise<Recipe> {
        throw new Error("Method not implemented.");
    }
}
