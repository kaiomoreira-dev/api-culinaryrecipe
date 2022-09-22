import { ICreateProdutoDTO } from "../dtos/ICreateProdutoDTO";
import { Produto } from "../infra/typeorm/entities/Produto";

export interface IProdutoRepository {
  create(data: ICreateProdutoDTO): Promise<Produto>;
  list(): Promise<Produto[]>;

  findByName(name: string): Promise<Produto>;

  findById(id: string): Promise<Produto>;

  updateById(id: string, name?: string, description?: string): Promise<Produto>;

  deleteById(id: string): Promise<void>;
}
