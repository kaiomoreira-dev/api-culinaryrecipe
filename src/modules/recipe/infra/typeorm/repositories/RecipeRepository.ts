import { ICreateRecipeDTO } from "@modules/recipe/dtos/ICreateRecipeDTO";
import { IRecipeRepository } from "@modules/recipe/repositories/IRecipeRepository";
import { Repository } from "typeorm";

import dataSource from "@shared/infra/typeorm";

import { Ingredient } from "../entities/Ingredient";
import { Recipe } from "../entities/Recipe";

export class RecipeRepository implements IRecipeRepository {
    private repository: Repository<Recipe>;

    constructor() {
        this.repository = dataSource.getRepository(Recipe);
    }
    async listAllRecipeByIngredientProdutoName(
        produto_name: string
    ): Promise<Recipe[]> {
        // encontra os ids das recipes que contem o ingrediente buscado
        const recipeIds = await this.repository
            .createQueryBuilder("r")
            .leftJoin("r.ingredients", "i")
            .where("i.produto_name = :produto_name", { produto_name })
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
    async updateAuthorNameByRecipeId(
        id: string,
        author_name: string
    ): Promise<Recipe> {
        await this.repository
            .createQueryBuilder()
            .update()
            .set({ author_name })
            .where("id = :id", { id })
            .execute();

        return this.repository.findOneBy({ id });
    }

    async findRecipeByName(name: string): Promise<Recipe> {
        return this.repository.findOneBy({ name });
    }
    async findRecipeByAuthor(author_name: string): Promise<Recipe> {
        return this.repository.findOneBy({ author_name });
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
        author_name,
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
            author_name,
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
        const recipes = await this.repository
            .createQueryBuilder()
            .where("difficulty = :difficulty", { difficulty })
            .getMany();

        return recipes;
    }
    async updateTimeByRecipeId(id: string, time: number): Promise<Recipe> {
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
