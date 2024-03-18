import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIsActivatedColumnToUsersTable1710764986849
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "users" ADD COLUMN "isActivated" BOOL DEFAULT false;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "users" DROP COLUMN "isActivated";
    `);
  }
}
