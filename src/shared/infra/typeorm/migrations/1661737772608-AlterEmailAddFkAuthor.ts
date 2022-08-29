import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class AlterEmailAddFkAuthor1661737772608 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      "emails",
      new TableForeignKey({
        name: "FKAuthorEmail",
        referencedTableName: "authors",
        referencedColumnNames: ["name"],
        columnNames: ["author_name"],
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("emails", "FKAuthorEmail");
  }
}
