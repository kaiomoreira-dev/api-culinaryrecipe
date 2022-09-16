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

import { CreateAuthorUseCase } from "../createAuthor/CreateAuthorUseCase";
import { CreateEmailUseCase } from "../createEmail/CreateEmailUseCase";
import { ListAuthorUseCase } from "./ListAuthorUseCase";

let produtoRepositoryInMemory: ProdutoRepositoryInMemory;
let ingredientRepositoryInMemory: IngredientRepositoryInMemory;
let emailRepositoryInMemory: EmailRepositoryInMemory;
let recipeRepositoryInMemory: RecipeRepositoryInMemory;
let authorRepositoryInMemory: AuthorRepositoryInMemory;
let createAuthorUseCase: CreateAuthorUseCase;
let createEmailUseCase: CreateEmailUseCase;
let createRecipeUseCase: CreateRecipeUseCase;
let createIngredientUseCase: CreateIngredientUseCase;
let listAuthorUseCase: ListAuthorUseCase;
let createProdutoUseCase: CreateProdutoUseCase;

describe("List authors UseCase", () => {
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
        createProdutoUseCase = new CreateProdutoUseCase(
            produtoRepositoryInMemory
        );
        listAuthorUseCase = new ListAuthorUseCase(authorRepositoryInMemory);
    });
    it("should be able to list authors", async () => {
        const author: ICreateAuthorDTO = {
            id: "ad539d66-e576-4913-8237-e5a6baff3ba4",
            name: "Kaio Moreira",
            whatsapp: faker.phone.number(),
        };

        const createAuthor1 = await createAuthorUseCase.execute(author);

        const email1: ICreateEmailDTO = {
            id: faker.datatype.uuid(),
            e_mail: faker.internet.email(),
            author_id: createAuthor1.id,
        };

        const email2: ICreateEmailDTO = {
            id: faker.datatype.uuid(),
            e_mail: faker.internet.email(),
            author_id: createAuthor1.id,
        };

        await createEmailUseCase.execute(email1);

        await createEmailUseCase.execute(email2);

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
            name: "Alho",
            produto_id: createProduto1.id,
            unity: 1,
            weight: 100,
        };

        const ingredient2: ICreateIngredientDTO = {
            id: faker.datatype.uuid(),
            description: faker.lorem.words(20),
            name: "Cebola",
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

        const recipe1: ICreateRecipeDTO = {
            id: faker.datatype.uuid(),
            additional_features: "cheap dish",
            author_id: createAuthor1.id,
            description: faker.lorem.words(20),
            difficulty: "easy",
            dish_type: "appetizer",
            name: "Recipe Test 1",
            time: 20,
            total_guests: 5,
        };

        const recipe2: ICreateRecipeDTO = {
            id: faker.datatype.uuid(),
            additional_features: "cheap dish",
            author_id: createAuthor1.id,
            description: faker.lorem.words(20),
            difficulty: "easy",
            dish_type: "appetizer",
            name: "Recipe Test 2",
            time: 20,
            total_guests: 5,
        };

        const ingredients: string[] = [
            createIngredient1.id,
            createIngredient2.id,
        ];

        await createRecipeUseCase.execute(recipe1, ingredients);
        await createRecipeUseCase.execute(recipe2, ingredients);

        const listAuthors = await listAuthorUseCase.execute();

        console.log(JSON.stringify(listAuthors, null, 2));

        expect(listAuthors[0]).toHaveProperty("id");
        expect(listAuthors[0]).toHaveProperty("emails");
        expect(listAuthors[0]).toHaveProperty("recipes");
    });
});
