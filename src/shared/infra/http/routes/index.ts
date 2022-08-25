import { Router } from "express";

import { authorRoutes } from "./author.routes";
import { emailRoutes } from "./email.routes";
import { ingredientRoutes } from "./ingredient.routes";
import { recipeRoutes } from "./recipe.routes";

export const routes = Router();

routes.use("/recipe", recipeRoutes);
routes.use("/ingredient", ingredientRoutes);
routes.use("/email", emailRoutes);
routes.use("/author", authorRoutes);
