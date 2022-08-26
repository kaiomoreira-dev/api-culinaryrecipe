import { Ingredient } from "@modules/recipe/infra/typeorm/entities/Ingredient";
import { IProdutoRepository } from "@modules/recipe/infra/typeorm/repositories/IProdutoRepository";

export class ProdutoRepository implements IProdutoRepository {
    indIngredientByProdutoName(produto_name: string): Promise<Ingredient> {
        throw new Error("Method not implemented.");
    }
    findAllIngredientByProdutoName(
        produto_name: string
    ): Promise<Ingredient[]> {
        throw new Error("Method not implemented.");
    }
    updateIngredientById(id: string): Promise<Ingredient> {
        throw new Error("Method not implemented.");
    }
    deleteIngredientById(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
