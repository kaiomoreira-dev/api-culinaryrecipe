import { ICreateAuthorDTO } from "../dtos/ICreateAuthorDTO";
import { Author } from "../infra/typeorm/entities/Author";

export interface IAuthorRepository {
  create(data: ICreateAuthorDTO): Promise<Author>;
  list(): Promise<Author[]>;

  findById(id: string): Promise<Author>;
  findByName(name: string): Promise<Author>;
  findByWhatsapp(whatsapp: string): Promise<Author>;

  updateById(id: string, name?: string, whatsapp?: string): Promise<Author>;

  deleteById(id: string): Promise<void>;
}
