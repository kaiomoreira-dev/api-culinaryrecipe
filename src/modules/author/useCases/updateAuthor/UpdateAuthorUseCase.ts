import { Author } from "@modules/author/infra/typeorm/entities/Author";
import { IAuthorRepository } from "@modules/author/repositories/IAuthorRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

@injectable()
export class UpdateAuthorUseCase {
    constructor(
        @inject("AuthorRepository")
        private authorRepository: IAuthorRepository
    ) {}

    async execute(
        id: string,
        name?: string,
        whatsapp?: string
    ): Promise<Author> {
        const authorValidator = await this.authorRepository.findById(id);
        if (!authorValidator) {
            throw new AppError("Author not found", 404);
        }

        const nameValidator = await this.authorRepository.findByName(name);

        if (nameValidator) {
            throw new AppError("Author name already exists", 401);
        }

        const whatsappValidator = await this.authorRepository.findByWhatsapp(
            whatsapp
        );

        if (whatsappValidator) {
            throw new AppError("Author whatsapp already exists", 401);
        }

        const updateAuthor = await this.authorRepository.updateById(
            authorValidator.id,
            name,
            whatsapp
        );

        return updateAuthor;
    }
}
