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
    async listRecipesByIngredientId(name: string): Promise<Recipe[]> {
        // encontra os ids das recipes que contem o ingrediente buscado
        const recipeIds = await this.repository
            .createQueryBuilder("r")
            .leftJoin("r.ingredients", "i")
            .where("i.name = :name", { name })
            .select(["r.id"])
            .getMany();

        // busca as recipes com seus respectivos ids
        // e passando leftjoinAndSelect p/ retornar tods os ingredients
        const recipes = await this.repository
            .createQueryBuilder("r")
            .leftJoinAndSelect("r.ingredients", "i")
            .whereInIds(recipeIds)
            .getMany();
        return recipes;
    }

    async findByName(name: string): Promise<Recipe> {
        return this.repository.findOneBy({ name });
    }
    async findByAuthorId(author_id: string): Promise<Recipe> {
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
    async findById(id: string): Promise<Recipe> {
        return this.repository.findOneBy({ id });
    }
    async listByDifficulty(difficulty: string): Promise<Recipe[]> {
        const recipes = await this.repository
            .createQueryBuilder()
            .where("difficulty = :difficulty", { difficulty })
            .getMany();

        return recipes;
    }
    async updateTimeById(id: string, time: number): Promise<Recipe> {
        await this.repository
            .createQueryBuilder()
            .update()
            .where("id = :id", { id })
            .set({ time })
            .execute();

        const recipe = await this.repository.findOneBy({ id });

        return recipe;
    }
    async deleteById(id: string): Promise<void> {
        await this.repository.delete({ id });
    }
}
