import { CreateRecipeController } from "@modules/recipe/useCases/createRecipe/CreateRecipeController";
import { ListRecipesByIngredientController } from "@modules/recipe/useCases/recipesIngredients/listByIngredient/ListRecipesByIngredientController";
import { Router } from "express";

export const recipeRoutes = Router();

const createRecipeController = new CreateRecipeController();

const listRecipesByIngredientController =
  new ListRecipesByIngredientController();

recipeRoutes.post("/", createRecipeController.handle);

//= =============Recipes-Ingredients========================
recipeRoutes.get(
  "/ingredient/produtoname",
  listRecipesByIngredientController.handle
);
