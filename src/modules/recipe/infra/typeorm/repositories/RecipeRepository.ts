import { ICreateRecipeDTO } from "@modules/recipe/dtos/ICreateRecipeDTO";
import { IRecipeRepository } from "@modules/recipe/repositories/IRecipeRepository";
import { Repository } from "typeorm";

import dataSource from "@shared/infra/typeorm";

import { Recipe } from "../entities/Recipe";

export class RecipeRepository implements IRecipeRepository {
    private repository: Repository<Recipe>;

    constructor() {
        this.repository = dataSource.getRepository(Recipe);
    }
    async findRecipeByAuthor(author_id: string): Promise<Recipe> {
        return this.repository.findOneBy({ author_id });
    }

    async create({
        id,
        description,
        name,
        additional_features,
        difficulty,
        dish_type,
        ingredients,
        time,
        total_guests,
        author_id,
    }: ICreateRecipeDTO): Promise<Recipe> {
        const recipe = this.repository.create({
            id,
            description,
            name,
            additional_features,
            difficulty,
            dish_type,
            ingredients,
            time,
            total_guests,
            author_id,
        });

        await this.repository.save(recipe);

        return recipe;
    }
    async list(): Promise<Recipe[]> {
        return this.repository.find();
    }
    async findRecipeById(id: string): Promise<Recipe> {
        return this.repository.findOneBy({ id });
    }
    async findRecipesByDifficulty(difficulty: string): Promise<Recipe[]> {
        return this.repository.find({ where: { difficulty } });
    }
    async updateRecipeTimeById(id: string, time: number): Promise<Recipe> {
        await this.repository
            .createQueryBuilder()
            .update()
            .where("id = :id", { id })
            .set({ time })
            .execute();

        const recipe = await this.repository.findOneBy({ id });

        return recipe;
    }
    async deleteRecipeById(id: string): Promise<void> {
        await this.repository.delete({ id });
    }
}
