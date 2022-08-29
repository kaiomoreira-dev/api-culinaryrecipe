import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRecipesIngredients1661737605277
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "recipes_ingredients",
        columns: [
          {
            name: "recipe_id",
            type: "uuid",
          },
          {
            name: "ingredient_id",
            type: "uuid",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FKRecipeIngredient",
            referencedTableName: "recipes",
            referencedColumnNames: ["id"],
            columnNames: ["recipe_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
          {
            name: "FKIngredientRecipe",
            referencedTableName: "ingredients",
            referencedColumnNames: ["id"],
            columnNames: ["ingredient_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("recipes_ingredients");
  }
}
