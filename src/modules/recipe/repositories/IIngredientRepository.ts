import { ICreateIngredientDTO } from "../dtos/ICreateIngredientDTO";
import { Ingredient } from "../infra/typeorm/entities/Ingredient";

export interface IIngredientRepository {
    create(data: ICreateIngredientDTO): Promise<Ingredient>;
    list(): Promise<Ingredient[]>;
    findIngredientByProdutoName(produto_name: string): Promise<Ingredient>;
    findAllIngredientByProdutoName(produto_name: string): Promise<Ingredient[]>;
    updateIngredientById(id: string): Promise<Ingredient>;
    deleteIngredientById(id: string): Promise<void>;
}
