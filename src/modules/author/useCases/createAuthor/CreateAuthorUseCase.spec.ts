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

import { CreateEmailUseCase } from "../createEmail/CreateEmailUseCase";
import { CreateAuthorUseCase } from "./CreateAuthorUseCase";

let produtoRepositoryInMemory: ProdutoRepositoryInMemory;
let ingredientRepositoryInMemory: IngredientRepositoryInMemory;
let emailRepositoryInMemory: EmailRepositoryInMemory;
let recipeRepositoryInMemory: RecipeRepositoryInMemory;
let authorRepositoryInMemory: AuthorRepositoryInMemory;
let createAuthorUseCase: CreateAuthorUseCase;
let createEmailUseCase: CreateEmailUseCase;
let createRecipeUseCase: CreateRecipeUseCase;
let createIngredientUseCase: CreateIngredientUseCase;
let createProdutoUseCase: CreateProdutoUseCase;

describe("Create author UseCase", () => {
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
    });

    it("should be able to create author", async () => {
        const email1: ICreateEmailDTO = {
            id: faker.datatype.uuid(),
            e_mail: faker.internet.email(),
        };
        const email2: ICreateEmailDTO = {
            id: faker.datatype.uuid(),
            e_mail: faker.internet.email(),
        };

        const createEmail1 = await createEmailUseCase.execute(email1);
        const createEmail2 = await createEmailUseCase.execute(email2);

        const produto1: ICreateProdutoDTO = {
            id: faker.datatype.uuid(),
            name: "Coentro",
            description: faker.lorem.words(20),
        };

        const produto2: ICreateProdutoDTO = {
            id: faker.datatype.uuid(),
            name: "Alho",
            description: faker.lorem.words(20),
        };

        const createProduto1 = await createProdutoUseCase.execute(produto1);
        const createProduto2 = await createProdutoUseCase.execute(produto2);

        const ingredient1: ICreateIngredientDTO = {
            id: faker.datatype.uuid(),
            name: "Coentro",
            description: faker.lorem.words(20),
            produto_id: createProduto1.id,
            unity: 4,
            weight: 100,
        };

        const ingredient2: ICreateIngredientDTO = {
            id: faker.datatype.uuid(),
            name: "Alho",
            description: faker.lorem.words(20),
            produto_id: createProduto2.id,
            unity: 4,
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
            name: "Receita 1",
            additional_features: "cheap dish",
            description: faker.lorem.words(20),
            difficulty: "easy",
            dish_type: "appetizer",
            time: 5,
            total_guests: 5,
        };
        const ingredients: string[] = [
            createIngredient1.id,
            createIngredient2.id,
        ];
        const createRecipe1 = await createRecipeUseCase.execute(
            recipe1,
            ingredients
        );

        const author: ICreateAuthorDTO = {
            id: faker.datatype.uuid(),
            name: faker.name.fullName(),
            whatsapp: faker.phone.number(),
        };
        const emails: string[] = [createEmail1.id, createEmail2.id];
        const recipes: string[] = [createRecipe1.id];

        const authorCreated = await createAuthorUseCase.execute(
            author,
            emails,
            recipes
        );

        // console.log(JSON.stringify(authorCreated, null, 2));

        expect(authorCreated).toHaveProperty("id");
    });

    it("should not be able to create author already exists", async () => {
        const email1: ICreateEmailDTO = {
            id: faker.datatype.uuid(),
            e_mail: faker.internet.email(),
        };
        const email2: ICreateEmailDTO = {
            id: faker.datatype.uuid(),
            e_mail: faker.internet.email(),
        };

        const createEmail1 = await createEmailUseCase.execute(email1);
        const createEmail2 = await createEmailUseCase.execute(email2);

        const produto1: ICreateProdutoDTO = {
            id: faker.datatype.uuid(),
            name: "Coentro",
            description: faker.lorem.words(20),
        };

        const produto2: ICreateProdutoDTO = {
            id: faker.datatype.uuid(),
            name: "Alho",
            description: faker.lorem.words(20),
        };

        const createProduto1 = await createProdutoUseCase.execute(produto1);
        const createProduto2 = await createProdutoUseCase.execute(produto2);

        const ingredient1: ICreateIngredientDTO = {
            id: faker.datatype.uuid(),
            name: "Coentro",
            description: faker.lorem.words(20),
            produto_id: createProduto1.id,
            unity: 4,
            weight: 100,
        };

        const ingredient2: ICreateIngredientDTO = {
            id: faker.datatype.uuid(),
            name: "Alho",
            description: faker.lorem.words(20),
            produto_id: createProduto2.id,
            unity: 4,
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
            name: "Receita 1",
            additional_features: "cheap dish",
            description: faker.lorem.words(20),
            difficulty: "easy",
            dish_type: "appetizer",
            time: 5,
            total_guests: 5,
        };
        const ingredients: string[] = [
            createIngredient1.id,
            createIngredient2.id,
        ];
        const createRecipe1 = await createRecipeUseCase.execute(
            recipe1,
            ingredients
        );

        const author: ICreateAuthorDTO = {
            id: faker.datatype.uuid(),
            name: "Kaio Moreira",
            whatsapp: faker.phone.number(),
        };
        const emails: string[] = [createEmail1.id, createEmail2.id];
        const recipes: string[] = [createRecipe1.id];

        const author1Created = await createAuthorUseCase.execute(
            author,
            emails,
            recipes
        );
        const author2: ICreateAuthorDTO = {
            id: faker.datatype.uuid(),
            name: "Kaio Moreira",
            whatsapp: faker.phone.number(),
        };

        await expect(
            createAuthorUseCase.execute(author2, emails, recipes)
        ).rejects.toEqual(new AppError("Author is already exists.", 401));
    });

    it("should not be able to create author with whatsapp is already exists", async () => {
        const email1: ICreateEmailDTO = {
            id: faker.datatype.uuid(),
            e_mail: faker.internet.email(),
        };
        const email2: ICreateEmailDTO = {
            id: faker.datatype.uuid(),
            e_mail: faker.internet.email(),
        };

        const createEmail1 = await createEmailUseCase.execute(email1);
        const createEmail2 = await createEmailUseCase.execute(email2);

        const produto1: ICreateProdutoDTO = {
            id: faker.datatype.uuid(),
            name: "Coentro",
            description: faker.lorem.words(20),
        };

        const produto2: ICreateProdutoDTO = {
            id: faker.datatype.uuid(),
            name: "Alho",
            description: faker.lorem.words(20),
        };

        const createProduto1 = await createProdutoUseCase.execute(produto1);
        const createProduto2 = await createProdutoUseCase.execute(produto2);

        const ingredient1: ICreateIngredientDTO = {
            id: faker.datatype.uuid(),
            name: "Coentro",
            description: faker.lorem.words(20),
            produto_id: createProduto1.id,
            unity: 4,
            weight: 100,
        };

        const ingredient2: ICreateIngredientDTO = {
            id: faker.datatype.uuid(),
            name: "Alho",
            description: faker.lorem.words(20),
            produto_id: createProduto2.id,
            unity: 4,
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
            name: "Receita 1",
            additional_features: "cheap dish",
            description: faker.lorem.words(20),
            difficulty: "easy",
            dish_type: "appetizer",
            time: 5,
            total_guests: 5,
        };
        const ingredients: string[] = [
            createIngredient1.id,
            createIngredient2.id,
        ];
        const createRecipe1 = await createRecipeUseCase.execute(
            recipe1,
            ingredients
        );

        const author: ICreateAuthorDTO = {
            id: faker.datatype.uuid(),
            name: faker.name.fullName(),
            whatsapp: "8888888888",
        };
        const emails: string[] = [createEmail1.id, createEmail2.id];
        const recipes: string[] = [createRecipe1.id];

        await createAuthorUseCase.execute(author, emails, recipes);
        const author2: ICreateAuthorDTO = {
            id: faker.datatype.uuid(),
            name: faker.name.fullName(),
            whatsapp: "8888888888",
        };

        await expect(
            createAuthorUseCase.execute(author2, emails, recipes)
        ).rejects.toEqual(new AppError("Whatsapp is already exists.", 401));
    });
});
