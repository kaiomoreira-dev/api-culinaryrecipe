import { ICreateIngredientDTO } from "../dtos/ICreateIngredientDTO";
import { Ingredient } from "../infra/typeorm/entities/Ingredient";
import { Produto } from "../infra/typeorm/entities/Produto";

export interface IIngredientRepository {
    create(data: ICreateIngredientDTO): Promise<Ingredient>;
    list(): Promise<Ingredient[]>;

    findIngredientByProdutoName(produto_name: string): Promise<Ingredient>;
    findAllIngredientByProdutoName(produto_name: string): Promise<Ingredient[]>;
    findIngredientByWeight(weight: number): Promise<Ingredient>;
    findIngredientByUnity(unity: number): Promise<Ingredient>;

    updateIngredientById(
        id: string,
        produto_name?: string,
        weight?: number,
        unity?: number
    ): Promise<Ingredient>;

    deleteIngredientById(id: string): Promise<void>;
}
