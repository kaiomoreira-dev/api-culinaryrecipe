import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class AlterEmailAddFkAuthor1661737772608 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      "emails",
      new TableForeignKey({
        name: "FKAuthorEmail",
        referencedTableName: "authors",
        referencedColumnNames: ["id"],
        columnNames: ["author_id"],
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("emails", "FKAuthorEmail");
  }
}
