import { ICreateRecipeDTO } from "../dtos/ICreateRecipeDTO";
import { Recipe } from "../infra/typeorm/entities/Recipe";

export interface IRecipeRepository {
    create(data: ICreateRecipeDTO): Promise<Recipe>;

    list(): Promise<Recipe[]>;
    listByDifficulty(difficulty: string): Promise<Recipe[]>;
    // //=====Recipes-Ingredients======//
    listRecipesByIngredientId(id: string): Promise<Recipe[]>;

    findById(id: string): Promise<Recipe>;
    findByAuthorId(author_id: string): Promise<Recipe>;
    findByName(name: string): Promise<Recipe>;

    updateTimeById(id: string, time: number): Promise<Recipe>;
    updateAuthorIdById(id: string, author_id: string): Promise<Recipe>;

    deleteRecipe(id: string, ingredient_ids: string[]): Promise<void>;
}
