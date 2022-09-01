import { IAuthorRepository } from "@modules/author/repositories/IAuthorRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
export class DeleteAuthorUseCase {
    constructor(
        @inject("AuthorRepository")
        private authorRepository: IAuthorRepository
    ) {}

    async execute(name: string): Promise<void> {
        const authorValidator = await this.authorRepository.findAuthorByName(
            name
        );

        if (!authorValidator) {
            throw new AppError("Author not found", 404);
        }
    }
}
