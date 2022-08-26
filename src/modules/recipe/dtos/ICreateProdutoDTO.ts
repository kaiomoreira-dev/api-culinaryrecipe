import { Ingredient } from "../infra/typeorm/entities/Ingredient";

export interface ICreateProdutoDTO {
    id?: string;

    name: string;

    ingredients?: Ingredient[];

    description: string;
}
