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

    async create({
        id,
        description,
        name,
        unity,
        weight,
        animal,
        color,
    }: ICreateIngredientDTO): Promise<Ingredient> {
        const ingredient = this.repository.create({
            id,
            description,
            name,
            unity,
            weight,
            animal,
            color,
        });

        await this.repository.save(ingredient);

        return ingredient;
    }
    async list(): Promise<Ingredient[]> {
        return this.repository.find();
    }
    async findIngredientByAnimal(animal: string): Promise<Ingredient> {
        return this.repository.findOneBy({ animal });
    }
    async findIngredientById(id: string): Promise<Ingredient> {
        return this.repository.findOneBy({ id });
    }
    async findIngredientByName(name: string): Promise<Ingredient> {
        return this.repository.findOneBy({ name });
    }
    async updateAnimalById(id: string, animal: string): Promise<Ingredient> {
        await this.repository
            .createQueryBuilder()
            .update()
            .where({ id })
            .set({ animal })
            .execute();

        return this.repository.findOneBy({ id });
    }
    async deleteIngredientById(id: string): Promise<void> {
        await this.repository
            .createQueryBuilder()
            .delete()
            .where({ id })
            .execute();
    }
}
