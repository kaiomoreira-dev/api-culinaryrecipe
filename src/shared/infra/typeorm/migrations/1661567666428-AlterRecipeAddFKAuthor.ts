import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class AlterRecipeAddFKAuthor1661567666428 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      "recipes",
      new TableForeignKey({
        name: "FKAuthorRecipe",
        referencedTableName: "authors",
        referencedColumnNames: ["name"],
        columnNames: ["author_name"],
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("recipes", "FKAuthorRecipe");
  }
}
