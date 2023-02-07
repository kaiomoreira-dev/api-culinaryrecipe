import { faker } from "@faker-js/faker";
import { ICreateAuthorDTO } from "@modules/author/dtos/ICreateAuthorDTO";
import { AuthorRepositoryInMemory } from "@modules/author/repositories/in-Memory/AuthorRepositoryInMemory";
import { EmailRepositoryInMemory } from "@modules/author/repositories/in-Memory/EmailRepositoryInMemory";
import { IngredientRepositoryInMemory } from "@modules/recipe/repositories/in-Memory/IngredientRepositoryInMemory";
import { ProdutoRepositoryInMemory } from "@modules/recipe/repositories/in-Memory/ProdutoRepositoryInMemory";
import { RecipeRepositoryInMemory } from "@modules/recipe/repositories/in-Memory/RecipeRepositoryInMemory";
import { CreateIngredientUseCase } from "@modules/recipe/useCases/createIngredient/CreateIngredientUseCase";
import { CreateProdutoUseCase } from "@modules/recipe/useCases/createProduto/CreateProdutoUseCase";
import { CreateRecipeUseCase } from "@modules/recipe/useCases/createRecipe/CreateRecipeUseCase";

import { AppError } from "@shared/errors/AppError";
import { redisClient } from "@shared/infra/http/middlewares/rateLimiter";

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
    createProdutoUseCase = new CreateProdutoUseCase(produtoRepositoryInMemory);
  });

  afterAll(() => {
    redisClient.quit();
  });

  it("should be able to create author", async () => {
    const author1: ICreateAuthorDTO = {
      id: faker.datatype.uuid(),
      name: faker.name.fullName(),
      whatsapp: faker.phone.number(),
    };

    const authorCreated = await createAuthorUseCase.execute(author1);

    expect(authorCreated).toHaveProperty("id");
  });

  it("should not be able to create author already exists", async () => {
    const author1: ICreateAuthorDTO = {
      id: faker.datatype.uuid(),
      name: "Kaio Moreira",
      whatsapp: faker.phone.number(),
    };
    await createAuthorUseCase.execute(author1);

    const author2: ICreateAuthorDTO = {
      id: faker.datatype.uuid(),
      name: "Kaio Moreira",
      whatsapp: faker.phone.number(),
    };

    await expect(createAuthorUseCase.execute(author2)).rejects.toEqual(
      new AppError("Author is already exists.", 401)
    );
  });

  it("should not be able to create author with whatsapp is already exists", async () => {
    const author1: ICreateAuthorDTO = {
      id: faker.datatype.uuid(),
      name: faker.name.fullName(),
      whatsapp: "8888888888",
    };

    await createAuthorUseCase.execute(author1);

    const author2: ICreateAuthorDTO = {
      id: faker.datatype.uuid(),
      name: faker.name.fullName(),
      whatsapp: "8888888888",
    };

    await expect(createAuthorUseCase.execute(author2)).rejects.toEqual(
      new AppError("Whatsapp is already exists.", 401)
    );
  });
});
