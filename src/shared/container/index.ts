import { EmailRepository } from "@modules/author/infra/typeorm/repositories/EmailRepository";
import { IEmailRepository } from "@modules/author/repositories/IEmailRepository";
import { IngredientRepository } from "@modules/recipe/infra/typeorm/repositories/IngredientRepository";
import { RecipeRepository } from "@modules/recipe/infra/typeorm/repositories/RecipeRepository";
import { IIngredientRepository } from "@modules/recipe/repositories/IIngredientRepository";
import { IRecipeRepository } from "@modules/recipe/repositories/IRecipeRepository";
import { container } from "tsyringe";

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
