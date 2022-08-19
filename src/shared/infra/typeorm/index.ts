import { Recipe } from "@modules/recipe/infra/typeorm/entities/Recipe";
import { DataSource } from "typeorm";

import { CreateRecipe1660942928513 } from "./migrations/1660942928513-CreateRecipe";

const dataSource = new DataSource({
  type: "postgres",
  port: 5432,
  username: "docker",
  password: "receitasecreta",
  database:
    process.env.NODE_ENV === "test"
      ? "culinary_recipes_test"
      : "culinary-recipes",

  // importar entidades ex: [Recipes]
  entities: [Recipe],
  // importar migrations ex: [CreateRecipes102348998]
  migrations: [CreateRecipe1660942928513],
});

export function createConnection(host = "database"): Promise<DataSource> {
  return dataSource.setOptions({ host }).initialize();
}

export default dataSource;
