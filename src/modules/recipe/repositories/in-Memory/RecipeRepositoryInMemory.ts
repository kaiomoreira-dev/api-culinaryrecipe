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
    async listAllRecipeByIngredientProdutoName(
        produto_name: string
    ): Promise<Recipe[]> {
        let recipesByProdutoName: Recipe[] = [];

        this.reciperepository.map((recipe) => {
            const { ingredients } = recipe;

            ingredients.map((ingredient) => {
                if (ingredient.produto_name === produto_name) {
                    recipesByProdutoName.push(recipe);
                }
                return true;
            });
            return true;
        });
        return recipesByProdutoName;
    }
    async findRecipeById(id: string): Promise<Recipe> {
        return this.reciperepository.find((recipe) => recipe.id === id);
    }
    async findRecipesByDifficulty(difficulty: string): Promise<Recipe[]> {
        let recipesByDifficulty: Recipe[] = [];
        this.reciperepository.map((recipe) => {
            if (recipe.difficulty === difficulty) {
                recipesByDifficulty.push(recipe);
            }
            return true;
        });

        return recipesByDifficulty;
    }
    async findRecipeByAuthor(author_name: string): Promise<Recipe> {
        return this.reciperepository.find(
            (recipe) => recipe.author_name === author_name
        );
    }
    async findRecipeByName(name: string): Promise<Recipe> {
        return this.reciperepository.find((recipe) => recipe.name === name);
    }
    async updateTimeByRecipeId(id: string, time: number): Promise<Recipe> {
        const recipeIndex = this.reciperepository.findIndex(
            (recipe) => recipe.id === id
        );

        this.reciperepository[recipeIndex].time = time;

        return this.reciperepository[recipeIndex];
    }
    async updateAuthorNameByRecipeId(
        id: string,
        author_name: string
    ): Promise<Recipe> {
        const recipeIndex = this.reciperepository.findIndex(
            (recipe) => recipe.id === id
        );

        this.reciperepository[recipeIndex].author_name = author_name;

        return this.reciperepository[recipeIndex];
    }
    async deleteRecipeById(id: string): Promise<void> {
        const recipeIndex = this.reciperepository.findIndex(
            (recipe) => recipe.id === id
        );

        this.reciperepository.splice(recipeIndex, 1);
    }
}
