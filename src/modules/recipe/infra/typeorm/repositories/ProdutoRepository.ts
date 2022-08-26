import { ICreateProdutoDTO } from "@modules/recipe/dtos/ICreateProdutoDTO";
import { Ingredient } from "@modules/recipe/infra/typeorm/entities/Ingredient";
import { Produto } from "@modules/recipe/infra/typeorm/entities/Produto";
import { IProdutoRepository } from "@modules/recipe/repositories/IProdutoRepository";
import { Repository } from "typeorm";

import dataSource from "@shared/infra/typeorm";

export class ProdutoRepository implements IProdutoRepository {
    private repository: Repository<Produto>;

    constructor() {
        this.repository = dataSource.getRepository(Produto);
    }
    create(data: ICreateProdutoDTO): Promise<Produto> {
        throw new Error("Method not implemented.");
    }
    list(): Promise<Produto[]> {
        throw new Error("Method not implemented.");
    }
    findIngredientByProdutoName(produto_name: string): Promise<Produto> {
        throw new Error("Method not implemented.");
    }
    findAllIngredientByProdutoName(produto_name: string): Promise<Produto[]> {
        throw new Error("Method not implemented.");
    }
    updateIngredientById(id: string): Promise<Produto> {
        throw new Error("Method not implemented.");
    }
    deleteIngredientById(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
