import { ICreateProdutoDTO } from "../dtos/ICreateProdutoDTO";
import { Produto } from "../infra/typeorm/entities/Produto";

export interface IProdutoRepository {
    create(data: ICreateProdutoDTO): Promise<Produto>;
    list(): Promise<Produto[]>;

    findIngredientByProdutoName(produto_name: string): Promise<Produto>;
    findAllIngredientByProdutoName(produto_name: string): Promise<Produto[]>;

    updateIngredientById(id: string): Promise<Produto>;

    deleteIngredientById(id: string): Promise<void>;
}
