import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterRecipeRemoveIngredient1661092158623
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("recipes", "ingredients");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "recipes",
      new TableColumn({
        name: "ingredients",
        type: "varchar",
      })
    );
  }
}
