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
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("recipes");
  }
}
