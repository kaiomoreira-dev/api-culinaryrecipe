/* eslint-disable prefer-const */
import { ICreateRecipeDTO } from "@modules/recipe/dtos/ICreateRecipeDTO";
import { Recipe } from "@modules/recipe/infra/typeorm/entities/Recipe";

import { IRecipeRepository } from "../IRecipeRepository";

export class RecipeRepositoryInMemory implements IRecipeRepository {
    reciperepository: Recipe[] = [];

    async create({
        id,
        name,
        description,
        ingredients,
        author_id,
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
            author_id,
            time,
            difficulty,
            dish_type,
            additional_features,
            total_guests,
        });

        this.reciperepository.push(recipe);

        return recipe;
    }
    async list(): Promise<Recipe[]> {
        return this.reciperepository;
    }
    async listRecipeByIngredientName(produto_id: string): Promise<Recipe[]> {
        let recipesByProdutoName: Recipe[] = [];

        this.reciperepository.map((recipe) => {
            const { ingredients } = recipe;

            ingredients.map((ingredient) => {
                if (ingredient.produto_id === produto_id) {
                    recipesByProdutoName.push(recipe);
                }
                return true;
            });
            return true;
        });
        return recipesByProdutoName;
    }
    async findById(id: string): Promise<Recipe> {
        return this.reciperepository.find((recipe) => recipe.id === id);
    }
    async listByDifficulty(difficulty: string): Promise<Recipe[]> {
        let recipesByDifficulty: Recipe[] = [];
        this.reciperepository.map((recipe) => {
            if (recipe.difficulty === difficulty) {
                recipesByDifficulty.push(recipe);
            }
            return true;
        });

        return recipesByDifficulty;
    }
    async findByAuthorId(author_id: string): Promise<Recipe> {
        return this.reciperepository.find(
            (recipe) => recipe.author_id === author_id
        );
    }
    async findByName(name: string): Promise<Recipe> {
        return this.reciperepository.find((recipe) => recipe.name === name);
    }
    async updateTimeById(id: string, time: number): Promise<Recipe> {
        const recipeIndex = this.reciperepository.findIndex(
            (recipe) => recipe.id === id
        );

        this.reciperepository[recipeIndex].time = time;

        return this.reciperepository[recipeIndex];
    }

    async deleteById(id: string): Promise<void> {
        const recipeIndex = this.reciperepository.findIndex(
            (recipe) => recipe.id === id
        );

        this.reciperepository.splice(recipeIndex, 1);
    }
}
