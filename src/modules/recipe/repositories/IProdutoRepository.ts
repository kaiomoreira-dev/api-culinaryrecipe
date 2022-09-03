import { ICreateProdutoDTO } from "../dtos/ICreateProdutoDTO";
import { Produto } from "../infra/typeorm/entities/Produto";

export interface IProdutoRepository {
    create(data: ICreateProdutoDTO): Promise<Produto>;
    list(): Promise<Produto[]>;

    findProdutoByName(name: string): Promise<Produto>;

    findProdutoById(id: string): Promise<Produto>;

    updateNameDescriptionById(
        id: string,
        new_name: string,
        new_description: string
    ): Promise<Produto>;

    deleteProdutoById(id: string): Promise<void>;
}
