import { Ingredient } from "@modules/recipe/infra/typeorm/entities/Ingredient";
import { Produto } from "@modules/recipe/infra/typeorm/entities/Produto";
import { IProdutoRepository } from "@modules/recipe/infra/typeorm/repositories/IProdutoRepository";
import { Repository } from "typeorm";

import dataSource from "@shared/infra/typeorm";

export class ProdutoRepository implements IProdutoRepository {
    private repository: Repository<Produto>;

    constructor() {
        this.repository = dataSource.getRepository(Produto);
    }

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
