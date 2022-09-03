import { ICreateIngredientDTO } from "../dtos/ICreateIngredientDTO";
import { Ingredient } from "../infra/typeorm/entities/Ingredient";
import { Produto } from "../infra/typeorm/entities/Produto";

export interface IIngredientRepository {
    create(data: ICreateIngredientDTO): Promise<Ingredient>;
    list(): Promise<Ingredient[]>;

    findAllIngredientByProdutoName(produto_id: string): Promise<Ingredient[]>;
    findIngredientByProdutoIdWeightUnity(
        produto_id: string,
        weight: number,
        unity: number
    ): Promise<Ingredient>;

    updateIngredientById(
        id: string,
        produto_id?: string,
        weight?: number,
        unity?: number
    ): Promise<Ingredient>;

    deleteIngredientById(id: string): Promise<void>;
}
