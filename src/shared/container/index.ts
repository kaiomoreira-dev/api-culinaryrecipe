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
