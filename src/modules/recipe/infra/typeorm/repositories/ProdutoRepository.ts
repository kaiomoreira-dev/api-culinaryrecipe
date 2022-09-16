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
        // criamos leftjoinselect para retornar
        // todos os produtos com a lista de ingredients
        return this.repository
            .createQueryBuilder("p")
            .leftJoinAndSelect("p.ingredients", "ingredients")
            .getMany();
    }

    async findByName(name: string): Promise<Produto> {
        return this.repository.findOneBy({ name });
    }
    async findById(id: string): Promise<Produto> {
        return this.repository.findOneBy({ id });
    }
    async updateById(
        id: string,
        new_name: string,
        new_description: string
    ): Promise<Produto> {
        await this.repository
            .createQueryBuilder()
            .update()
            .set({ name: new_name, description: new_description })
            .where("id = :id", { id })
            .execute();

        return this.repository.findOneBy({ name: new_name });
    }
    async deleteById(id: string): Promise<void> {
        await this.repository
            .createQueryBuilder()
            .delete()
            .where("id = :id", { id })
            .from(Produto)
            .execute();
    }
}
