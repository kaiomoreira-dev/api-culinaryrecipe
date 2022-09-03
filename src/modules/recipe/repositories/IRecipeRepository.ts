import { ICreateRecipeDTO } from "../dtos/ICreateRecipeDTO";
import { Recipe } from "../infra/typeorm/entities/Recipe";

export interface IRecipeRepository {
    create(data: ICreateRecipeDTO): Promise<Recipe>;
    list(): Promise<Recipe[]>;
    listAllRecipeByIngredientProdutoId(produto_id: string): Promise<Recipe[]>;

    findRecipesByDifficulty(difficulty: string): Promise<Recipe[]>;
    findRecipeByAuthor(author_id: string): Promise<Recipe>;
    findRecipeByName(name: string): Promise<Recipe>;

    updateTimeByRecipeId(id: string, time: number): Promise<Recipe>;

    deleteRecipeById(id: string): Promise<void>;
}
