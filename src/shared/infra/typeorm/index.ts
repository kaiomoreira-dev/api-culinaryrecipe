import { Ingredient } from "@modules/recipe/infra/typeorm/entities/Ingredient";
import { Recipe } from "@modules/recipe/infra/typeorm/entities/Recipe";
import { DataSource } from "typeorm";

import { CreateRecipe1660942928513 } from "./migrations/1660942928513-CreateRecipe";
import { CreateIngredient1661028123973 } from "./migrations/1661028123973-CreateIngredient";
import { CreateRecipesIngredients1661042649597 } from "./migrations/1661042649597-CreateRecipesIngredients";

const dataSource = new DataSource({
  type: "postgres",
  port: 5432,
  username: "docker",
  password: "receitasecreta",
  database:
    process.env.NODE_ENV === "test"
      ? "culinary_recipes_test"
      : "culinary_recipes",

  // importar entidades ex: [Recipes]
  entities: [Recipe, Ingredient],
  // importar migrations ex: [CreateRecipes102348998]
  migrations: [
    CreateRecipe1660942928513,
    CreateIngredient1661028123973,
    CreateRecipesIngredients1661042649597,
  ],
});

export function createConnection(host = "localhost"): Promise<DataSource> {
  return dataSource.setOptions({ host }).initialize();
}

export default dataSource;
