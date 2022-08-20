import { Router } from "express";

import { recipeRoutes } from "./recipe.routes";

export const routes = Router();

routes.use("/recipe", recipeRoutes);
