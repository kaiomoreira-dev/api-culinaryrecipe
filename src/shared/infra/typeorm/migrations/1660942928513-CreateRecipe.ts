import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRecipe1660942928513 implements MigrationInterface {
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
            name: "description",
            type: "varchar",
          },
          {
            name: "ingredients",
            type: "varchar",
          },
          {
            name: "time",
            type: "numeric",
          },
          {
            name: "difficulty",
            type: "varchar",
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
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("recipes");
  }
}
