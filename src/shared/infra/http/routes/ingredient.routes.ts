import { CreateIngredientController } from "@modules/recipe/useCases/createIngredient/CreateIngredientController";
import { ListIngredientController } from "@modules/recipe/useCases/listIngredient/ListIngredientController";
import { Router } from "express";

export const ingredientRoutes = Router();

const createIngredientController = new CreateIngredientController();

const listIngredientController = new ListIngredientController();

ingredientRoutes.post("/", createIngredientController.handle);

ingredientRoutes.get("/", listIngredientController.handle);
