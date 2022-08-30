import { ICreateProdutoDTO } from "@modules/recipe/dtos/ICreateProdutoDTO";
import { Produto } from "@modules/recipe/infra/typeorm/entities/Produto";

import { IProdutoRepository } from "../IProdutoRepository";

export class ProdutoRepositoryInMemory implements IProdutoRepository {
    create(data: ICreateProdutoDTO): Promise<Produto> {
        throw new Error("Method not implemented.");
    }
    list(): Promise<Produto[]> {
        throw new Error("Method not implemented.");
    }
    findProdutoByName(name: string): Promise<Produto> {
        throw new Error("Method not implemented.");
    }
    updateNameDescriptionByName(
        name: string,
        new_name: string,
        description: string
    ): Promise<Produto> {
        throw new Error("Method not implemented.");
    }
    deleteProdutoByname(name: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
