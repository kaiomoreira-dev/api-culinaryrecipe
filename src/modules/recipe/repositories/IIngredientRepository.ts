import { ICreateIngredientDTO } from "../dtos/ICreateIngredientDTO";
import { Ingredient } from "../infra/typeorm/entities/Ingredient";

export interface IIngredientRepository {
    create(data: ICreateIngredientDTO): Promise<Ingredient>;
    list(): Promise<Ingredient[]>;
    findAllIngredientsByAnimal(animal: string): Promise<Ingredient[]>;
    findIngredientById(id: string): Promise<Ingredient>;
    findAllIngredientsByName(name: string): Promise<Ingredient[]>;
    updateAnimalById(id: string, animal: string): Promise<Ingredient>;
    deleteIngredientById(id: string): Promise<void>;
}
