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
    async findIngredientByWeightAndUnity(
        weight: number,
        unity: number
    ): Promise<Ingredient> {
        return this.repository.findOneBy({ weight, unity });
    }
    async findAllIngredientByProdutoName(
        produto_name: string
    ): Promise<Ingredient[]> {
        return this.repository
            .createQueryBuilder()
            .where("produto_name = :produto_name", { produto_name })
            .getMany();
    }

    async updateIngredientById(
        id: string,
        produto_name?: string,
        weight?: number,
        unity?: number
    ): Promise<Ingredient> {
        await this.repository
            .createQueryBuilder()
            .update()
            .set({ produto_name, weight, unity })
            .where("id = :id", { id })
            .execute();

        return this.repository.findOneBy({ id });
    }

    async create({
        id,
        description,
        produto_name,
        unity,
        weight,
    }: ICreateIngredientDTO): Promise<Ingredient> {
        const ingredient = this.repository.create({
            id,
            description,
            produto_name,
            unity,
            weight,
        });

        await this.repository.save(ingredient);

        return ingredient;
    }
    async list(): Promise<Ingredient[]> {
        return this.repository.find();
    }

    async findIngredientByProdutoName(
        produto_name: string
    ): Promise<Ingredient> {
        return this.repository.findOneBy({ produto_name });
    }

    async deleteIngredientById(id: string): Promise<void> {
        await this.repository
            .createQueryBuilder()
            .delete()
            .where({ id })
            .execute();
    }
}
