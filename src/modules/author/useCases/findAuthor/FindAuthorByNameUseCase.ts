import { Author } from "@modules/author/infra/typeorm/entities/Author";
import { IAuthorRepository } from "@modules/author/repositories/IAuthorRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindAuthorByNameUseCase {
    constructor(
        @inject("AuthorRepository")
        private authorRepository: IAuthorRepository
    ) {}

    async execute(author_name: string): Promise<Author> {}
}
