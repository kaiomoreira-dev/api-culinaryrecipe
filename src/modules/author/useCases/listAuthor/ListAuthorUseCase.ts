import { Author } from "@modules/author/infra/typeorm/entities/Author";
import { IAuthorRepository } from "@modules/author/repositories/IAuthorRepository";
import { IEmailRepository } from "@modules/author/repositories/IEmailRepository";
import { IRecipeRepository } from "@modules/recipe/repositories/IRecipeRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListAuthorUseCase {
    constructor(
        // author tem fk de emails e recipes
        // instanciamos os repositorios, mas nao fazemos
        // nenhuma operação, apenas para quando
        // formos criar os test conseguirmos fazermos o leftjoin
        // em emails e recipes, buscando cada email e recipe
        // pelo author_id e atualizamos a lista de emails e recipes em author
        // me memoria para retornar todos os relacionandos

        @inject("AuthorRepository")
        private authorRepository: IAuthorRepository,

        @inject("EmailRepository")
        private emailRepository: IEmailRepository,

        @inject("RecipeRepository")
        private recipeRepository: IRecipeRepository
    ) {}

    async execute(): Promise<Author[]> {
        const authors = this.authorRepository.list();

        return authors;
    }
}
