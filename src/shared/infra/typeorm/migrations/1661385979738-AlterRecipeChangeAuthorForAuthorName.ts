import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterRecipeChangeAuthorForAuthorName1661385979738
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "recipes",
      "author",
      new TableColumn({
        name: "author_name",
        type: "varchar",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "recipes",
      "author_id",
      new TableColumn({
        name: "author",
        type: "varchar",
      })
    );
  }
}
