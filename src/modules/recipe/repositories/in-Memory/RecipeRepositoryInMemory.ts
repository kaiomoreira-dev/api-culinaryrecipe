/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import { ICreateRecipeDTO } from "@modules/recipe/dtos/ICreateRecipeDTO";
import { Recipe } from "@modules/recipe/infra/typeorm/entities/Recipe";
import { inject, injectable } from "tsyringe";

import { IIngredientRepository } from "../IIngredientRepository";
import { IRecipeRepository } from "../IRecipeRepository";

@injectable()
export class RecipeRepositoryInMemory implements IRecipeRepository {
  reciperepository: Recipe[] = [];

  constructor(
    @inject("IngredientRepositoryInMemory")
    private ingredientRepositoryInMemory: IIngredientRepository
  ) {}

  async listByAuthorId(author_id: string): Promise<Recipe[]> {
    const recipes = this.reciperepository.map((recipe) => {
      if (recipe.author_id === author_id) {
        return recipe;
      }
      return false;
    });
    const formatRecipes = recipes as unknown as Recipe[];

    return formatRecipes;
  }

  async updateAuthorIdById(id: string, author_id: string): Promise<Recipe> {
    const recipeIndex = this.reciperepository.findIndex(
      (recipe) => recipe.id === id
    );

    this.reciperepository[recipeIndex].author_id = author_id;

    return this.reciperepository.find((recipe) => recipe.id === id);
  }

  async deleteRecipeById(id: string, ingredient_ids: string[]): Promise<void> {
    for (const ingredient_id of ingredient_ids) {
      await this.ingredientRepositoryInMemory.deleteById(ingredient_id);
    }

    const recipeIndex = this.reciperepository.findIndex(
      (recipe) => recipe.id === id
    );

    this.reciperepository.splice(recipeIndex, 1);
  }

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
  async listRecipesByIngredientId(id: string): Promise<Recipe[]> {
    let recipesByIngredientId: Recipe[] = [];

    this.reciperepository.map((recipe) => {
      const { ingredients } = recipe;

      ingredients.map((ingredient) => {
        if (ingredient.id === id) {
          recipesByIngredientId.push(recipe);
        }
        return true;
      });
      return true;
    });
    return recipesByIngredientId;
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
}
