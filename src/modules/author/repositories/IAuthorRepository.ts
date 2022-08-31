import { ICreateAuthorDTO } from "../dtos/ICreateAuthorDTO";
import { Author } from "../infra/typeorm/entities/Author";

export interface IAuthorRepository {
    create(data: ICreateAuthorDTO): Promise<Author>;
    list(): Promise<Author[]>;
    findAuthorByName(name: string): Promise<Author>;
    updateNameAndWhatsappByName(
        name: string,
        new_name: string,
        whatsapp: string
    ): Promise<Author>;
    deleteAuthorByName(name: string): Promise<void>;
}
