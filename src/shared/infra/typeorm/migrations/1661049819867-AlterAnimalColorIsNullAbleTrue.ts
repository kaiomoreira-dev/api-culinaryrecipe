import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterAnimalColorIsNullAbleTrue1661049819867
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "ingredients",
      "animal",
      new TableColumn({
        name: "animal",
        type: "varchar",
        isNullable: true,
      })
    );

    await queryRunner.changeColumn(
      "ingredients",
      "color",
      new TableColumn({
        name: "color",
        type: "varchar",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "ingredients",
      "animal",
      new TableColumn({
        name: "animal",
        type: "varchar",
      })
    );

    await queryRunner.changeColumn(
      "ingredients",
      "color",
      new TableColumn({
        name: "color",
        type: "varchar",
      })
    );
  }
}
