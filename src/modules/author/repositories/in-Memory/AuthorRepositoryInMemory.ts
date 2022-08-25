import { ICreateAuthorDTO } from "@modules/author/dtos/ICreateAuthorDTO";
import { Author } from "@modules/author/infra/typeorm/entities/Author";

import { IAuthorRepository } from "../IAuthorRepository";

export class AuthorRepositoryInMemory implements IAuthorRepository {
    create(data: ICreateAuthorDTO): Promise<Author> {
        throw new Error("Method not implemented.");
    }
    list(): Promise<Author[]> {
        throw new Error("Method not implemented.");
    }
    findAuthorByEmail(e_mail: string): Promise<Author> {
        throw new Error("Method not implemented.");
    }
    findAuthorByName(name: string): Promise<Author> {
        throw new Error("Method not implemented.");
    }
    deleteAuthorById(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
