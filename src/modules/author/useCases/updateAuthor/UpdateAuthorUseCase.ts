import { Author } from "@modules/author/infra/typeorm/entities/Author";
import { IAuthorRepository } from "@modules/author/repositories/IAuthorRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateAuthorUseCase {
    constructor(
        @inject("AuthorRepository")
        private authorRepository: IAuthorRepository
    ) {}

    async execute(
        name: string,
        newName?: string,
        whatsapp?: string
    ): Promise<Author> {}
}
