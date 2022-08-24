import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateAuthor1661369761866 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // id?:string;
    // name: string;
    // whatsapp: string;
    // recipes: Recipe[]
    // emails:Email[];
    await queryRunner.createTable(
      new Table({
        name: "authors",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "whatsapp",
            type: "varchar",
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
            name: "FKRecipeAuthor",
            referencedTableName: "recipes",
            referencedColumnNames: ["id"],
            columnNames: ["id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "FKEmailAuthor",
            referencedTableName: "emails",
            referencedColumnNames: ["id"],
            columnNames: ["id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("authors");
  }
}
