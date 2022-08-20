import { ICreateRecipeDTO } from "../dtos/ICreateRecipeDTO";
import { Recipe } from "../infra/typeorm/entities/Recipe";

export interface IRecipeRepository {
    create(data: ICreateRecipeDTO): Promise<Recipe>;
    list(): Promise<Recipe[]>;
    findRecipeById(id: string): Promise<Recipe>;
    findRecipesByDifficulty(difficulty: string): Promise<Recipe[]>;
    updateRecipeTimeById(id: string, time: number): Promise<Recipe>;
    deleteRecipeById(id: string): Promise<void>;
}
