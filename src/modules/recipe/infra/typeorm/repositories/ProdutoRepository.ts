import { ICreateProdutoDTO } from "@modules/recipe/dtos/ICreateProdutoDTO";
import { Produto } from "@modules/recipe/infra/typeorm/entities/Produto";
import { IProdutoRepository } from "@modules/recipe/repositories/IProdutoRepository";
import { Repository } from "typeorm";

import dataSource from "@shared/infra/typeorm";

export class ProdutoRepository implements IProdutoRepository {
    private repository: Repository<Produto>;

    constructor() {
        this.repository = dataSource.getRepository(Produto);
    }
    async create({
        id,
        name,
        description,
        ingredients,
    }: ICreateProdutoDTO): Promise<Produto> {
        const produto = this.repository.create({
            id,
            name,
            description,
            ingredients,
        });

        await this.repository.save(produto);

        return produto;
    }

    async list(): Promise<Produto[]> {
        return this.repository.find();
    }

    findProdutoByName(name: string): Promise<Produto> {
        throw new Error("Method not implemented.");
    }
    updateProdutoByName(name: string): Promise<Produto> {
        throw new Error("Method not implemented.");
    }
    deleteProdutoByname(name: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
