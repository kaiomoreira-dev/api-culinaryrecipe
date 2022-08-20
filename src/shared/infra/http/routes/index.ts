import { Router } from "express";

import { recipeRoutes } from "./recipe.routes";

export const router = Router();

router.use("/recipe", recipeRoutes);
