import { ICreateAuthorDTO } from "@modules/author/dtos/ICreateAuthorDTO";
import { IAuthorRepository } from "@modules/author/repositories/IAuthorRepository";

import { Author } from "../entities/Author";

export class AuthorRepository implements IAuthorRepository {
    create(data: ICreateAuthorDTO): Promise<Author> {
        throw new Error("Method not implemented.");
    }
    list(): Promise<Author[]> {
        throw new Error("Method not implemented.");
    }
    findAuthorByEmail(email: string): Promise<Author> {
        throw new Error("Method not implemented.");
    }
    findAuthorByName(name: string): Promise<Author> {
        throw new Error("Method not implemented.");
    }
    deleteAuthorById(id: string): Promise<Author> {
        throw new Error("Method not implemented.");
    }
}
