import { ICreateIngredientsDTO } from "@modules/recipe/dtos/ICreateIngredientsDTO";
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
    }: ICreateIngredientsDTO): Promise<Ingredient> {
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
    async findAllIngredientsByAnimal(animal: string): Promise<Ingredient[]> {
        return this.repository.find({ where: { animal } });
    }
    async findIngredientById(id: string): Promise<Ingredient> {
        return this.repository.findOneBy({ id });
    }
    async findAllIngredientsByName(name: string): Promise<Ingredient[]> {
        return this.repository.find({ where: { name } });
    }
    updateAnimalById(id: string): Promise<Ingredient> {
        throw new Error("Method not implemented.");
    }
    deleteIngredientById(id: string): Promise<Ingredient> {
        throw new Error("Method not implemented.");
    }
}
