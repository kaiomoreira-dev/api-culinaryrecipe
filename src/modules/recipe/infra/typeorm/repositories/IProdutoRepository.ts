import { Ingredient } from "../entities/Ingredient";

export interface IProdutoRepository {
    indIngredientByProdutoName(produto_name: string): Promise<Ingredient>;
    findAllIngredientByProdutoName(produto_name: string): Promise<Ingredient[]>;
    updateIngredientById(id: string): Promise<Ingredient>;
    deleteIngredientById(id: string): Promise<void>;
}
