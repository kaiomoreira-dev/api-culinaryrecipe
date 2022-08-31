import { Author } from "@modules/author/infra/typeorm/entities/Author";
import { IAuthorRepository } from "@modules/author/repositories/IAuthorRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListAuthorUseCase {
    constructor(
        // author tem fk de emails e recipes
        // mas nao instanciamos seu repositorio para inserir,
        // pois automaticamento com o releacionamento
        // entre eles a lista são incrementada, ao criar.
        @inject("AuthorRepository")
        private authorRepository: IAuthorRepository
    ) {}

    async execute(): Promise<Author[]> {
        const authors = this.authorRepository.list();

        return authors;
    }
}
