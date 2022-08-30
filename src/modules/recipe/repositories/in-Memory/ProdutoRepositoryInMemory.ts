import { ICreateProdutoDTO } from "@modules/recipe/dtos/ICreateProdutoDTO";
import { Produto } from "@modules/recipe/infra/typeorm/entities/Produto";

import { IProdutoRepository } from "../IProdutoRepository";

export class ProdutoRepositoryInMemory implements IProdutoRepository {
    repository: Produto[] = [];

    async create({
        id,
        name,
        description,
        ingredients,
    }: ICreateProdutoDTO): Promise<Produto> {
        const produto = new Produto();

        Object.assign(produto, {
            id,
            name,
            description,
            ingredients,
        });

        this.repository.push(produto);

        return produto;
    }
    async list(): Promise<Produto[]> {
        return this.repository;
    }
    async findProdutoByName(name: string): Promise<Produto> {
        return this.repository.find((produto) => produto.name === name);
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
