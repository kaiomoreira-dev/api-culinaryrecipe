import { ICreateProdutoDTO } from "../dtos/ICreateProdutoDTO";
import { Produto } from "../infra/typeorm/entities/Produto";

export interface IProdutoRepository {
    create(data: ICreateProdutoDTO): Promise<Produto>;
    list(): Promise<Produto[]>;

    findProdutoByName(name: string): Promise<Produto>;

    updateProdutoByName(name: string): Promise<Produto>;

    deleteProdutoByname(name: string): Promise<void>;
}
