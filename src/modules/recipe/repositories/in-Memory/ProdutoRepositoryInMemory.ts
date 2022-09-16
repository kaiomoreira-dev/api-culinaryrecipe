import { ICreateProdutoDTO } from "@modules/recipe/dtos/ICreateProdutoDTO";
import { Produto } from "@modules/recipe/infra/typeorm/entities/Produto";

import { IProdutoRepository } from "../IProdutoRepository";

export class ProdutoRepositoryInMemory implements IProdutoRepository {
    repository: Produto[] = [];

    async findById(id: string): Promise<Produto> {
        return this.repository.find((produto) => produto.id === id);
    }
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
    async findByName(name: string): Promise<Produto> {
        return this.repository.find((produto) => produto.name === name);
    }
    async updateById(
        id: string,
        new_name: string,
        new_description: string
    ): Promise<Produto> {
        const produtoIndex = this.repository.findIndex(
            (produto) => produto.id === id
        );

        this.repository[produtoIndex].name = new_name;
        this.repository[produtoIndex].description = new_description;

        const prdoutoUpdated = this.repository.find(
            (produto) => produto.name === new_name
        );

        return prdoutoUpdated;
    }
    async deleteById(name: string): Promise<void> {
        const produtoIndex = this.repository.findIndex(
            (produto) => produto.name === name
        );

        this.repository.splice(produtoIndex, 1);
    }
}
