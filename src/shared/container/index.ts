import { RecipeRepository } from "@modules/recipe/infra/typeorm/repositories/RecipeRepository";
import { IRecipeRepository } from "@modules/recipe/repositories/IRecipeRepository";
import { container } from "tsyringe";

container.registerSingleton<IRecipeRepository>(
    "RecipeRepository",
    RecipeRepository
);
