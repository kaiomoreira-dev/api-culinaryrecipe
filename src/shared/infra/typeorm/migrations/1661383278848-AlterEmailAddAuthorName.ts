import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterEmailAddAuthorName1661383278848
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "emails",
      new TableColumn({
        name: "author_name",
        type: "varchar",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("emails", "author_name");
  }
}
