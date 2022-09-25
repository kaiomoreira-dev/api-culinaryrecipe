import { CreateRecipeController } from "@modules/recipe/useCases/createRecipe/CreateRecipeController";
import { ListRecipecontroller } from "@modules/recipe/useCases/listRecipe/ListRecipeController";
import { ListRecipesByIngredientController } from "@modules/recipe/useCases/recipesIngredients/listByIngredient/ListRecipesByIngredientController";
import { Router } from "express";

export const recipeRoutes = Router();

const createRecipeController = new CreateRecipeController();

const listRecipecontroller = new ListRecipecontroller();

const listRecipesByIngredientController =
  new ListRecipesByIngredientController();

recipeRoutes.post("/", createRecipeController.handle);

recipeRoutes.get("/", listRecipecontroller.handle);

//= =============Recipes-Ingredients========================
recipeRoutes.get("/ingredient/:id", listRecipesByIngredientController.handle);
