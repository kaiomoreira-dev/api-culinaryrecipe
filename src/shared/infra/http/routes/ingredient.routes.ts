import { CreateIngredientController } from "@modules/recipe/useCases/createIngredient/CreateIngredientController";
import { Router } from "express";

export const ingredientRoutes = Router();

const createIngredientController = new CreateIngredientController();

ingredientRoutes.post("/", createIngredientController.handle);
