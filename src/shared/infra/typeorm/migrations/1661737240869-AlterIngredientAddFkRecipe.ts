import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class AlterIngredientAddFkRecipe1661737240869
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      "ingredients",
      new TableForeignKey({
        name: "FKProdutoIngredient",
        referencedTableName: "produtos",
        referencedColumnNames: ["name"],
        columnNames: ["produto_name"],
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("ingredients", "FKProdutoIngredient");
  }
}
