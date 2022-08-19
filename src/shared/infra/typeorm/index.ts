import { DataSource } from "typeorm";

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
  entities: [],
  // importar migrations ex: [CreateRecipes102348998]
  migrations: [],
});

export function createConnection(host = "database"): Promise<DataSource> {
  return dataSource.setOptions({ host }).initialize();
}

export default dataSource;
