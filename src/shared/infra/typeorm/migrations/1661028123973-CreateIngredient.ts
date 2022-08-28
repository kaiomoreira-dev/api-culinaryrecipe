import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateIngredient1661028123973 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "ingredients",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "produto_name",
            type: "varchar",
          },
          {
            name: "description",
            type: "varchar",
          },
          {
            name: "weight",
            type: "numeric",
          },
          {
            name: "unity",
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
            name: "FKProdutoIngredient",
            referencedTableName: "produtos",
            referencedColumnNames: ["name"],
            columnNames: ["produto_name"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("ingredients");
  }
}
