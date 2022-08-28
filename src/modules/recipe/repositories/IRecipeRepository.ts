import { ICreateRecipeDTO } from "../dtos/ICreateRecipeDTO";
import { Recipe } from "../infra/typeorm/entities/Recipe";

export interface IRecipeRepository {
    create(data: ICreateRecipeDTO): Promise<Recipe>;
    list(): Promise<Recipe[]>;
    listAllRecipeByIngredientProdutoName(
        produto_name: string
    ): Promise<Recipe[]>;

    findRecipeById(id: string): Promise<Recipe>;
    findRecipesByDifficulty(difficulty: string): Promise<Recipe[]>;
    findRecipeByAuthor(author_name: string): Promise<Recipe>;
    findRecipeByName(name: string): Promise<Recipe>;

    updateTimeByRecipeId(id: string, time: number): Promise<Recipe>;
    updateAuthorNameByRecipeId(
        id: string,
        author_name: string
    ): Promise<Recipe>;

    deleteRecipeById(id: string): Promise<void>;
}
