import { ICreateAuthorDTO } from "../dtos/ICreateAuthorDTO";
import { Author } from "../infra/typeorm/entities/Author";

export interface IAuthorRepository {
    create(data: ICreateAuthorDTO): Promise<Author>;
    list(): Promise<Author[]>;
    findAuthorByEmail(e_mail: string): Promise<Author>;
    findAuthorByName(name: string): Promise<Author>;
    deleteAuthorById(id: string): Promise<void>;
}
