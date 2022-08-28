import { CreateRecipeController } from "@modules/recipe/useCases/createRecipe/CreateRecipeController";
import { ListAllRecipesByImgredientProdutoNameController } from "@modules/recipe/useCases/recipesIngredients/listAllRecipesByIngredientProdutoName/ListAllRecipesByImgredientProdutoNameController";
import { Router } from "express";

export const recipeRoutes = Router();

const createRecipeController = new CreateRecipeController();

const listAllRecipesByImgredientProdutoNameController =
  new ListAllRecipesByImgredientProdutoNameController();

recipeRoutes.post("/", createRecipeController.handle);

//= =============Recipes-Ingredients========================
recipeRoutes.get(
  "/ingredient/produtoname",
  listAllRecipesByImgredientProdutoNameController.handle
);
