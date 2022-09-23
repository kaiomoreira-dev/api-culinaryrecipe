import { CreateIngredientController } from "@modules/recipe/useCases/createIngredient/CreateIngredientController";
import { ListIngredientController } from "@modules/recipe/useCases/listIngredient/ListIngredientController";
import { ListIngredientByProdutoController } from "@modules/recipe/useCases/listIngredientByProduto/ListIngredientByProdutoController";
import { Router } from "express";

export const ingredientRoutes = Router();

const createIngredientController = new CreateIngredientController();

const listIngredientController = new ListIngredientController();

const listIngredientByProdutoController =
  new ListIngredientByProdutoController();

ingredientRoutes.post("/", createIngredientController.handle);

ingredientRoutes.get("/", listIngredientController.handle);

ingredientRoutes.get("/produto/:id", listIngredientByProdutoController.handle);
