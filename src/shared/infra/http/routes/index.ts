import { Router } from "express";

import { ingredientRoutes } from "./ingredient.routes";
import { recipeRoutes } from "./recipe.routes";

export const routes = Router();

routes.use("/recipe", recipeRoutes);
routes.use("/ingredient", ingredientRoutes);
