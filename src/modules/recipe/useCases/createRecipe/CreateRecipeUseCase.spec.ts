import { faker } from "@faker-js/faker";
import { ICreateAuthorDTO } from "@modules/author/dtos/ICreateAuthorDTO";
import { AuthorRepositoryInMemory } from "@modules/author/repositories/in-Memory/AuthorRepositoryInMemory";
import { EmailRepositoryInMemory } from "@modules/author/repositories/in-Memory/EmailRepositoryInMemory";
import { CreateAuthorUseCase } from "@modules/author/useCases/createAuthor/CreateAuthorUseCase";
import { CreateEmailUseCase } from "@modules/author/useCases/createEmail/CreateEmailUseCase";
import { ICreateIngredientDTO } from "@modules/recipe/dtos/ICreateIngredientDTO";
import { ICreateProdutoDTO } from "@modules/recipe/dtos/ICreateProdutoDTO";
import { ICreateRecipeDTO } from "@modules/recipe/dtos/ICreateRecipeDTO";
import { IngredientRepositoryInMemory } from "@modules/recipe/repositories/in-Memory/IngredientRepositoryInMemory";
import { ProdutoRepositoryInMemory } from "@modules/recipe/repositories/in-Memory/ProdutoRepositoryInMemory";
import { RecipeRepositoryInMemory } from "@modules/recipe/repositories/in-Memory/RecipeRepositoryInMemory";

import { AppError } from "@shared/errors/AppError";

import { CreateIngredientUseCase } from "../createIngredient/CreateIngredientUseCase";
import { CreateProdutoUseCase } from "../createProduto/CreateProdutoUseCase";
import { CreateRecipeUseCase } from "./CreateRecipeUseCase";

let emailRepositoryInMemory: EmailRepositoryInMemory;
let produtoRepositoryInMemory: ProdutoRepositoryInMemory;
let ingredientRepositoryInMemory: IngredientRepositoryInMemory;
let authorRepositoryInMemory: AuthorRepositoryInMemory;
let recipeRepositoryInMemory: RecipeRepositoryInMemory;
let createRecipeUseCase: CreateRecipeUseCase;
let createAuthorUseCase: CreateAuthorUseCase;
let createIngredientUseCase: CreateIngredientUseCase;
let createProdutoUseCase: CreateProdutoUseCase;
let createEmailUseCase: CreateEmailUseCase;

describe("Create recipe UseCase", () => {
    beforeEach(() => {
        emailRepositoryInMemory = new EmailRepositoryInMemory();
        produtoRepositoryInMemory = new ProdutoRepositoryInMemory();
        ingredientRepositoryInMemory = new IngredientRepositoryInMemory();
        authorRepositoryInMemory = new AuthorRepositoryInMemory(
            emailRepositoryInMemory,
            recipeRepositoryInMemory
        );
        recipeRepositoryInMemory = new RecipeRepositoryInMemory(
            ingredientRepositoryInMemory
        );
        createRecipeUseCase = new CreateRecipeUseCase(
            recipeRepositoryInMemory,
            ingredientRepositoryInMemory,
            authorRepositoryInMemory
        );
        createAuthorUseCase = new CreateAuthorUseCase(authorRepositoryInMemory);
        createIngredientUseCase = new CreateIngredientUseCase(
            ingredientRepositoryInMemory,
            produtoRepositoryInMemory
        );
        createProdutoUseCase = new CreateProdutoUseCase(
            produtoRepositoryInMemory
        );

        createEmailUseCase = new CreateEmailUseCase(
            emailRepositoryInMemory,
            authorRepositoryInMemory
        );
    });

    it("should be able to create a recipe", async () => {
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

        const author: ICreateAuthorDTO = {
            id: faker.datatype.uuid(),
            name: faker.name.fullName(),
            whatsapp: faker.phone.number(),
        };

        const authorCreated = await createAuthorUseCase.execute(author);

        const recipe: ICreateRecipeDTO = {
            id: faker.datatype.uuid(),
            name: "Receita 1",
            description: faker.lorem.words(20),
            additional_features: "cheap dish",
            difficulty: "easy",
            dish_type: "appetizer",
            time: 20,
            total_guests: 5,
            author_id: authorCreated.id,
        };

        const ingredients: string[] = [
            createIngredient1.id,
            createIngredient2.id,
        ];

        const createRecipe = await createRecipeUseCase.execute(
            recipe,
            ingredients
        );

        expect(createRecipe).toHaveProperty("id");
    });

    it("should not be able to create recipe with difficulty incorrect", async () => {
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

        const author: ICreateAuthorDTO = {
            id: faker.datatype.uuid(),
            name: faker.name.fullName(),
            whatsapp: faker.phone.number(),
        };

        const authorCreated = await createAuthorUseCase.execute(author);

        const recipe: ICreateRecipeDTO = {
            id: faker.datatype.uuid(),
            name: "Receita 1",
            description: faker.lorem.words(20),
            additional_features: "cheap dish",
            difficulty: "fake-difficulty",
            dish_type: "appetizer",
            time: 20,
            total_guests: 5,
            author_id: authorCreated.id,
        };

        const ingredients: string[] = [
            createIngredient1.id,
            createIngredient2.id,
        ];

        await expect(
            createRecipeUseCase.execute(recipe, ingredients)
        ).rejects.toEqual(new AppError("difficulty incorrect!", 401));
    });

    it("should not be able to create recipe with dish_type incorrect", async () => {
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

        const author: ICreateAuthorDTO = {
            id: faker.datatype.uuid(),
            name: faker.name.fullName(),
            whatsapp: faker.phone.number(),
        };

        const authorCreated = await createAuthorUseCase.execute(author);

        const recipe: ICreateRecipeDTO = {
            id: faker.datatype.uuid(),
            name: "Receita 1",
            description: faker.lorem.words(20),
            additional_features: "cheap dish",
            difficulty: "easy",
            dish_type: "fake-dish_type",
            time: 20,
            total_guests: 5,
            author_id: authorCreated.id,
        };

        const ingredients: string[] = [
            createIngredient1.id,
            createIngredient2.id,
        ];

        await expect(
            createRecipeUseCase.execute(recipe, ingredients)
        ).rejects.toEqual(new AppError("dish_type incorrect!", 401));
    });

    it("should not be able to create recipe with ingredient not exists", async () => {
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
        const author: ICreateAuthorDTO = {
            id: faker.datatype.uuid(),
            name: faker.name.fullName(),
            whatsapp: faker.phone.number(),
        };

        const authorCreated = await createAuthorUseCase.execute(author);

        const recipe: ICreateRecipeDTO = {
            id: faker.datatype.uuid(),
            name: "Receita 1",
            description: faker.lorem.words(20),
            additional_features: "cheap dish",
            difficulty: "easy",
            dish_type: "appetizer",
            time: 20,
            total_guests: 5,
            author_id: authorCreated.id,
        };

        const ingredients: string[] = [
            createIngredient1.id,
            createIngredient2.id,
            "fake-ingredient",
        ];

        await expect(
            createRecipeUseCase.execute(recipe, ingredients)
        ).rejects.toEqual(new AppError("Ingredient not found", 404));
    });

    it("should not be able to create a recipe with less than two ingredients", async () => {
        const produto1: ICreateProdutoDTO = {
            id: faker.datatype.uuid(),
            name: "Alho",
            description: faker.lorem.paragraphs(),
        };

        const createProduto1 = await createProdutoUseCase.execute(produto1);

        const ingredient1: ICreateIngredientDTO = {
            id: faker.datatype.uuid(),
            description: faker.lorem.words(20),
            name: "Alho",
            produto_id: createProduto1.id,
            unity: 1,
            weight: 100,
        };

        const createIngredient1 = await createIngredientUseCase.execute(
            ingredient1
        );

        const author: ICreateAuthorDTO = {
            id: faker.datatype.uuid(),
            name: faker.name.fullName(),
            whatsapp: faker.phone.number(),
        };

        const authorCreated = await createAuthorUseCase.execute(author);

        const recipe: ICreateRecipeDTO = {
            id: faker.datatype.uuid(),
            name: "Receita 1",
            description: faker.lorem.words(20),
            additional_features: "cheap dish",
            difficulty: "easy",
            dish_type: "appetizer",
            time: 20,
            total_guests: 5,
            author_id: authorCreated.id,
        };

        const ingredients: string[] = [createIngredient1.id];

        await expect(
            createRecipeUseCase.execute(recipe, ingredients)
        ).rejects.toEqual(new AppError("Ingredients insufficient!", 401));
    });
});
