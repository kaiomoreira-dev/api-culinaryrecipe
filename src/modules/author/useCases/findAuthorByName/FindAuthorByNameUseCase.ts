import { Author } from "@modules/author/infra/typeorm/entities/Author";
import { IAuthorRepository } from "@modules/author/repositories/IAuthorRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
export class FindAuthorByNameUseCase {
    constructor(
        @inject("AuthorRepository")
        private authorRepository: IAuthorRepository
    ) {}

    async execute(author_id: string): Promise<Author> {
        const authorValidator = await this.authorRepository.findById(author_id);

        if (!authorValidator) {
            throw new AppError("Author not found", 404);
        }

        return authorValidator;
    }
}
