import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateIngredient1661028123973 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // id?:string;
    // description:string;
    // name:string;
    // weight: number;
    // unity:number;
    // animal?:string;
    // cor?:string;
    // created_at: string;
    // updated_at: string;
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
