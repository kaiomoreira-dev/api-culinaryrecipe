import { faker } from "@faker-js/faker";
import { ICreateAuthorDTO } from "@modules/author/dtos/ICreateAuthorDTO";
import { ICreateEmailDTO } from "@modules/author/dtos/ICreateEmailDTO";
import { AuthorRepositoryInMemory } from "@modules/author/repositories/in-Memory/AuthorRepositoryInMemory";
import { EmailRepositoryInMemory } from "@modules/author/repositories/in-Memory/EmailRepositoryInMemory";
import { ICreateIngredientDTO } from "@modules/recipe/dtos/ICreateIngredientDTO";
import { ICreateProdutoDTO } from "@modules/recipe/dtos/ICreateProdutoDTO";
import { ICreateRecipeDTO } from "@modules/recipe/dtos/ICreateRecipeDTO";
import { IngredientRepositoryInMemory } from "@modules/recipe/repositories/in-Memory/IngredientRepositoryInMemory";
import { ProdutoRepositoryInMemory } from "@modules/recipe/repositories/in-Memory/ProdutoRepositoryInMemory";
import { RecipeRepositoryInMemory } from "@modules/recipe/repositories/in-Memory/RecipeRepositoryInMemory";
import { CreateIngredientUseCase } from "@modules/recipe/useCases/createIngredient/CreateIngredientUseCase";
import { CreateProdutoUseCase } from "@modules/recipe/useCases/createProduto/CreateProdutoUseCase";
import { CreateRecipeUseCase } from "@modules/recipe/useCases/createRecipe/CreateRecipeUseCase";

import { AppError } from "@shared/errors/AppError";
import { redisClient } from "@shared/infra/http/middlewares/rateLimiter";

import { CreateAuthorUseCase } from "../createAuthor/CreateAuthorUseCase";
import { CreateEmailUseCase } from "../createEmail/CreateEmailUseCase";
import { ListAuthorUseCase } from "../listAuthor/ListAuthorUseCase";
import { DeleteAuthorUseCase } from "./DeleteAuthorUseCase";

let produtoRepositoryInMemory: ProdutoRepositoryInMemory;
let ingredientRepositoryInMemory: IngredientRepositoryInMemory;
let emailRepositoryInMemory: EmailRepositoryInMemory;
let recipeRepositoryInMemory: RecipeRepositoryInMemory;
let authorRepositoryInMemory: AuthorRepositoryInMemory;
let createAuthorUseCase: CreateAuthorUseCase;
let createEmailUseCase: CreateEmailUseCase;
let createRecipeUseCase: CreateRecipeUseCase;
let createIngredientUseCase: CreateIngredientUseCase;
let deleteAuthorUseCase: DeleteAuthorUseCase;
let createProdutoUseCase: CreateProdutoUseCase;
let listAuthorUseCase: ListAuthorUseCase;

describe("Delete author UseCase", () => {
    beforeEach(() => {
        produtoRepositoryInMemory = new ProdutoRepositoryInMemory();
        ingredientRepositoryInMemory = new IngredientRepositoryInMemory();
        emailRepositoryInMemory = new EmailRepositoryInMemory();
        recipeRepositoryInMemory = new RecipeRepositoryInMemory(
            ingredientRepositoryInMemory
        );
        authorRepositoryInMemory = new AuthorRepositoryInMemory(
            emailRepositoryInMemory,
            recipeRepositoryInMemory
        );
        createAuthorUseCase = new CreateAuthorUseCase(authorRepositoryInMemory);
        createEmailUseCase = new CreateEmailUseCase(
            emailRepositoryInMemory,
            authorRepositoryInMemory
        );
        createIngredientUseCase = new CreateIngredientUseCase(
            ingredientRepositoryInMemory,
            produtoRepositoryInMemory
        );
        createRecipeUseCase = new CreateRecipeUseCase(
            recipeRepositoryInMemory,
            ingredientRepositoryInMemory,
            authorRepositoryInMemory
        );
        deleteAuthorUseCase = new DeleteAuthorUseCase(
            authorRepositoryInMemory,
            emailRepositoryInMemory,
            recipeRepositoryInMemory
        );
        createProdutoUseCase = new CreateProdutoUseCase(
            produtoRepositoryInMemory
        );
        listAuthorUseCase = new ListAuthorUseCase(authorRepositoryInMemory);
    });

    afterAll(() => {
        redisClient.quit();
    });

    it("should be able to delete author using id", async () => {
        const author: ICreateAuthorDTO = {
            id: "f060c7bc-4539-4bd8-a3ac-f4b7d98f54d6",
            name: faker.name.fullName(),
            whatsapp: faker.phone.number(),
        };

        const createAuthor = await createAuthorUseCase.execute(author);

        const produto1: ICreateProdutoDTO = {
            id: faker.datatype.uuid(),
            name: "Alho",
            description: faker.lorem.paragraphs(),
        };
        const produto2: ICreateProdutoDTO = {
            id: faker.datatype.uuid(),
            name: "Cebola",
            description: faker.lorem.paragraphs(),
        };

        const createProduto1 = await createProdutoUseCase.execute(produto1);

        const createProduto2 = await createProdutoUseCase.execute(produto2);

        const ingredient1: ICreateIngredientDTO = {
            id: faker.datatype.uuid(),
            description: faker.lorem.words(20),
            produto_id: createProduto1.id,
            unity: 1,
            weight: 100,
        };

        const ingredient2: ICreateIngredientDTO = {
            id: faker.datatype.uuid(),
            description: faker.lorem.words(20),
            produto_id: createProduto2.id,
            unity: 1,
            weight: 100,
        };

        const createIngredient1 = await createIngredientUseCase.execute(
            ingredient1
        );

        const createIngredient2 = await createIngredientUseCase.execute(
            ingredient2
        );

        const email1: ICreateEmailDTO = {
            id: faker.datatype.uuid(),
            e_mail: "test1@test.com.br",
            author_id: createAuthor.id,
        };

        const email2: ICreateEmailDTO = {
            id: faker.datatype.uuid(),
            e_mail: "test2@test.com.br",
            author_id: createAuthor.id,
        };

        await createEmailUseCase.execute(email1);
        await createEmailUseCase.execute(email2);

        const recipe: ICreateRecipeDTO = {
            id: faker.datatype.uuid(),
            name: "Receita 1",
            description: faker.lorem.words(20),
            additional_features: "cheap dish",
            difficulty: "easy",
            dish_type: "appetizer",
            author_id: createAuthor.id,
            time: 20,
            total_guests: 5,
        };

        const ingredients: string[] = [
            createIngredient1.id,
            createIngredient2.id,
        ];

        await createRecipeUseCase.execute(recipe, ingredients);

        // console.log(JSON.stringify(listAuthors, null, 2));

        const deleteAuthor = await deleteAuthorUseCase.execute(createAuthor.id);

        expect(deleteAuthor).toBe(null);
    });

    it("should not be able to delete author using id invalid", async () => {
        const author: ICreateAuthorDTO = {
            id: "f060c7bc-4539-4bd8-a3ac-f4b7d98f54d6",
            name: faker.name.fullName(),
            whatsapp: faker.phone.number(),
        };

        await expect(deleteAuthorUseCase.execute(author.id)).rejects.toEqual(
            new AppError("Author not found", 404)
        );
    });
});
