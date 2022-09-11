import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateEmail1661287166449 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "emails",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "e_mail",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "author_id",
            type: "uuid",
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
    await queryRunner.dropTable("emails");
  }
}
