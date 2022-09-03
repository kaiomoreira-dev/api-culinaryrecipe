import { ICreateAuthorDTO } from "../dtos/ICreateAuthorDTO";
import { Author } from "../infra/typeorm/entities/Author";

export interface IAuthorRepository {
    create(data: ICreateAuthorDTO): Promise<Author>;
    list(): Promise<Author[]>;

    findAuthorById(id: string): Promise<Author>;
    findAuthorByName(name: string): Promise<Author>;
    findAuthorByWhatsapp(whatsapp: string): Promise<Author>;

    updateNameAndWhatsappById(
        id: string,
        new_name?: string,
        whatsapp?: string
    ): Promise<Author>;

    deleteAuthorById(id: string): Promise<void>;
}
