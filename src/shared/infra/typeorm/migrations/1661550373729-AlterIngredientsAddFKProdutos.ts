import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class AlterIngredientsAddFKProdutos1661550373729
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
