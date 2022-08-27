import { ICreateProdutoDTO } from "../dtos/ICreateProdutoDTO";
import { Ingredient } from "../infra/typeorm/entities/Ingredient";
import { Produto } from "../infra/typeorm/entities/Produto";

export interface IProdutoRepository {
    create(data: ICreateProdutoDTO): Promise<Produto>;
    list(): Promise<Produto[]>;

    findProdutoByName(name: string): Promise<Produto>;

    updateProdutoById(
        id: string,
        name?: string,
        description?: string
    ): Promise<Produto>;

    deleteProdutoByname(name: string): Promise<void>;
}
