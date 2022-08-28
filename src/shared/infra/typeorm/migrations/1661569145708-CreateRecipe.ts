import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRecipe1661569145708 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "recipes",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "author_name",
            type: "varchar",
          },

          {
            name: "description",
            type: "varchar",
          },

          {
            name: "time",
            type: "numeric",
          },
          {
            name: "difficulty",
            type: "varchar",
            enum: ["easy", "medium", "hard"],
          },
          {
            name: "dish_type",
            type: "varchar",
          },
          {
            name: "additional_features",
            type: "varchar",
          },
          {
            name: "total_guests",
            type: "numeric",
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
            name: "FKAuthorRecipe",
            referencedTableName: "authors",
            referencedColumnNames: ["name"],
            columnNames: ["author_name"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );

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
    await queryRunner.dropTable("recipes");
  }
}
