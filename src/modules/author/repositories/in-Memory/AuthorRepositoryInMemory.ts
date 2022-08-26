import { ICreateAuthorDTO } from "@modules/author/dtos/ICreateAuthorDTO";
import { Author } from "@modules/author/infra/typeorm/entities/Author";
import { IRecipeRepository } from "@modules/recipe/repositories/IRecipeRepository";
import { inject, injectable } from "tsyringe";

import { IAuthorRepository } from "../IAuthorRepository";
import { IEmailRepository } from "../IEmailRepository";

@injectable()
export class AuthorRepositoryInMemory implements IAuthorRepository {
    private authorRepository: Author[] = [];

    constructor(
        @inject("EmailRepository")
        private emailRepository: IEmailRepository,

        @inject("RecipeRepository")
        private recipeRepository: IRecipeRepository
    ) {}

    async create({
        id,
        name,
        whatsapp,
        emails,
        recipes,
    }: ICreateAuthorDTO): Promise<Author> {
        const author = new Author();

        Object.assign(author, {
            id,
            name,
            whatsapp,
            emails,
            recipes,
        });

        this.authorRepository.push(author);

        return author;
    }
    async list(): Promise<Author[]> {
        return this.authorRepository;
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
