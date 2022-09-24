import { faker } from "@faker-js/faker";
import { ICreateAuthorDTO } from "@modules/author/dtos/ICreateAuthorDTO";
import { AuthorRepositoryInMemory } from "@modules/author/repositories/in-Memory/AuthorRepositoryInMemory";
import { EmailRepositoryInMemory } from "@modules/author/repositories/in-Memory/EmailRepositoryInMemory";
import { CreateAuthorUseCase } from "@modules/author/useCases/createAuthor/CreateAuthorUseCase";
import { ICreateIngredientDTO } from "@modules/recipe/dtos/ICreateIngredientDTO";
import { ICreateProdutoDTO } from "@modules/recipe/dtos/ICreateProdutoDTO";
import { ICreateRecipeDTO } from "@modules/recipe/dtos/ICreateRecipeDTO";
import { IngredientRepositoryInMemory } from "@modules/recipe/repositories/in-Memory/IngredientRepositoryInMemory";
import { ProdutoRepositoryInMemory } from "@modules/recipe/repositories/in-Memory/ProdutoRepositoryInMemory";
import { RecipeRepositoryInMemory } from "@modules/recipe/repositories/in-Memory/RecipeRepositoryInMemory";

import { redisClient } from "@shared/infra/http/middlewares/rateLimiter";

import { CreateIngredientUseCase } from "../createIngredient/CreateIngredientUseCase";
import { CreateProdutoUseCase } from "../createProduto/CreateProdutoUseCase";
import { CreateRecipeUseCase } from "../createRecipe/CreateRecipeUseCase";
import { ListRecipeUseCase } from "./ListRecipeUseCase";

let emailRepositoryInMemory: EmailRepositoryInMemory;
let produtoRepositoryInMemory: ProdutoRepositoryInMemory;
let ingredientRepositoryInMemory: IngredientRepositoryInMemory;
let authorRepositoryInMemory: AuthorRepositoryInMemory;
let recipeRepositoryInMemory: RecipeRepositoryInMemory;
let createRecipeUseCase: CreateRecipeUseCase;
let createAuthorUseCase: CreateAuthorUseCase;
let createIngredientUseCase: CreateIngredientUseCase;
let createProdutoUseCase: CreateProdutoUseCase;
let listRecipeUseCase: ListRecipeUseCase;

describe("List recipes UseCase", () => {
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
    createProdutoUseCase = new CreateProdutoUseCase(produtoRepositoryInMemory);

    listRecipeUseCase = new ListRecipeUseCase(recipeRepositoryInMemory);
  });

  afterAll(() => {
    redisClient.quit();
  });

  it("should be able to list all recipes", async () => {
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
    const produto3: ICreateProdutoDTO = {
      id: faker.datatype.uuid(),
      name: "Pimenta",
      description: faker.lorem.paragraphs(),
    };

    const produto4: ICreateProdutoDTO = {
      id: faker.datatype.uuid(),
      name: "Coentro",
      description: faker.lorem.paragraphs(),
    };

    const createProduto1 = await createProdutoUseCase.execute(produto1);

    const createProduto2 = await createProdutoUseCase.execute(produto2);

    const createProduto3 = await createProdutoUseCase.execute(produto3);

    const createProduto4 = await createProdutoUseCase.execute(produto4);

    const ingredient1: ICreateIngredientDTO = {
      id: faker.datatype.uuid(),
      produto_id: createProduto1.id,
      unity: 1,
      weight: 100,
    };

    const ingredient2: ICreateIngredientDTO = {
      id: faker.datatype.uuid(),
      produto_id: createProduto2.id,
      unity: 1,
      weight: 100,
    };
    const ingredient3: ICreateIngredientDTO = {
      id: faker.datatype.uuid(),
      produto_id: createProduto3.id,
      unity: 1,
      weight: 100,
    };
    const ingredient4: ICreateIngredientDTO = {
      id: faker.datatype.uuid(),
      produto_id: createProduto4.id,
      unity: 1,
      weight: 100,
    };

    const createIngredient1 = await createIngredientUseCase.execute(
      ingredient1
    );

    const createIngredient2 = await createIngredientUseCase.execute(
      ingredient2
    );

    const createIngredient3 = await createIngredientUseCase.execute(
      ingredient3
    );

    const createIngredient4 = await createIngredientUseCase.execute(
      ingredient4
    );

    const author1: ICreateAuthorDTO = {
      id: faker.datatype.uuid(),
      name: faker.name.fullName(),
      whatsapp: faker.phone.number(),
    };

    const author2: ICreateAuthorDTO = {
      id: faker.datatype.uuid(),
      name: faker.name.fullName(),
      whatsapp: faker.phone.number(),
    };

    const authorCreated1 = await createAuthorUseCase.execute(author1);

    const authorCreated2 = await createAuthorUseCase.execute(author2);

    const recipe1: ICreateRecipeDTO = {
      id: faker.datatype.uuid(),
      name: "Receita 1",
      description: faker.lorem.words(20),
      additional_features: "cheap dish",
      difficulty: "easy",
      dish_type: "appetizer",
      time: 20,
      total_guests: 5,
      author_id: authorCreated1.id,
    };

    const recipe2: ICreateRecipeDTO = {
      id: faker.datatype.uuid(),
      name: "Receita 2",
      description: faker.lorem.words(20),
      additional_features: "cheap dish",
      difficulty: "easy",
      dish_type: "appetizer",
      time: 20,
      total_guests: 5,
      author_id: authorCreated2.id,
    };

    const ingredients1: string[] = [createIngredient1.id, createIngredient2.id];

    const ingredients2: string[] = [
      createIngredient1.id,
      createIngredient2.id,
      createIngredient3.id,
      createIngredient4.id,
    ];

    await createRecipeUseCase.execute(recipe1, ingredients1);

    await createRecipeUseCase.execute(recipe2, ingredients2);

    const recipes = await listRecipeUseCase.execute();

    // console.log(JSON.stringify(recipes, null, 2));

    expect(recipes[0]).toHaveProperty("id");
  });
});
