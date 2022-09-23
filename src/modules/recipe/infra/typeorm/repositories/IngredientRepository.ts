import { ICreateIngredientDTO } from "@modules/recipe/dtos/ICreateIngredientDTO";
import { IIngredientRepository } from "@modules/recipe/repositories/IIngredientRepository";
import { Repository } from "typeorm";

import dataSource from "@shared/infra/typeorm";

import { Ingredient } from "../entities/Ingredient";

export class IngredientRepository implements IIngredientRepository {
    private repository: Repository<Ingredient>;

    constructor() {
        this.repository = dataSource.getRepository(Ingredient);
    }
    async findByProdutoIdWeightUnity(
        produto_id: string,
        weight: number,
        unity: number
    ): Promise<Ingredient> {
        return this.repository.findOneBy({ weight, unity, produto_id });
    }
    async listByProdutoId(produto_id: string): Promise<Ingredient[]> {
        return this.repository
            .createQueryBuilder()
            .where("produto_id = :produto_id", { produto_id })
            .getMany();
    }
    async updateById(
        id: string,
        produto_id?: string,
        weight?: number,
        unity?: number
    ): Promise<Ingredient> {
        await this.repository
            .createQueryBuilder()
            .update()
            .set({ produto_id, weight, unity })
            .where("id = :id", { id })
            .execute();

        return this.repository.findOneBy({ id });
    }

    async create({
        id,
        produto_id,
        unity,
        weight,
    }: ICreateIngredientDTO): Promise<Ingredient> {
        const ingredient = this.repository.create({
            id,
            produto_id,
            unity,
            weight,
        });

        await this.repository.save(ingredient);

        return ingredient;
    }
    async list(): Promise<Ingredient[]> {
        return this.repository.find();
    }

    async findById(id: string): Promise<Ingredient> {
        return this.repository.findOneBy({ id });
    }

    async deleteById(id: string): Promise<void> {
        await this.repository
            .createQueryBuilder()
            .delete()
            .where({ id })
            .execute();
    }
}
