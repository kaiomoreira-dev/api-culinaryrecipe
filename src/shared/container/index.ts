import { AuthorRepository } from "@modules/author/infra/typeorm/repositories/AuthorRepository";
import { EmailRepository } from "@modules/author/infra/typeorm/repositories/EmailRepository";
import { IAuthorRepository } from "@modules/author/repositories/IAuthorRepository";
import { IEmailRepository } from "@modules/author/repositories/IEmailRepository";
import { IngredientRepository } from "@modules/recipe/infra/typeorm/repositories/IngredientRepository";
import { RecipeRepository } from "@modules/recipe/infra/typeorm/repositories/RecipeRepository";
import { IIngredientRepository } from "@modules/recipe/repositories/IIngredientRepository";
import { IRecipeRepository } from "@modules/recipe/repositories/IRecipeRepository";
import { container } from "tsyringe";

import "@modules/author/repositories/in-Memory";

container.registerSingleton<IRecipeRepository>(
  "RecipeRepository",
  RecipeRepository
);

container.registerSingleton<IIngredientRepository>(
  "IngredientRepository",
  IngredientRepository
);

container.registerSingleton<IEmailRepository>(
  "EmailRepository",
  EmailRepository
);

container.registerSingleton<IAuthorRepository>(
  "AuthorRepository",
  AuthorRepository
);
