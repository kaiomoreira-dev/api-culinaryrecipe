import { Ingredient } from "../infra/typeorm/entities/Ingredient";

export interface ICreateProdutoDTO {
    id?: string;

    name: string;

    description: string;

    ingredients?: Ingredient[];
}
