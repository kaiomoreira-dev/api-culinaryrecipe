import { ICreateIngredientDTO } from "../dtos/ICreateIngredientDTO";
import { Ingredient } from "../infra/typeorm/entities/Ingredient";

export interface IIngredientRepository {
  create(data: ICreateIngredientDTO): Promise<Ingredient>;
  list(): Promise<Ingredient[]>;
  listByProdutoId(produto_id: string): Promise<Ingredient[]>;

  findById(id: string): Promise<Ingredient>;
  findByProdutoIdWeightUnity(
    produto_id: string,
    weight: number,
    unity: number
  ): Promise<Ingredient>;

  updateById(
    id: string,
    produto_id?: string,
    weight?: number,
    unity?: number
  ): Promise<Ingredient>;

  deleteById(id: string): Promise<void>;
}
