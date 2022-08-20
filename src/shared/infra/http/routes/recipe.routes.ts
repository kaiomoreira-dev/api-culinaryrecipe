import { CreateRecipeController } from "@modules/recipe/useCases/createRecipe/CreateRecipeController";
import { Router } from "express";

export const recipeRoutes = Router();

const createRecipeController = new CreateRecipeController();

recipeRoutes.post("/", createRecipeController.handle);
