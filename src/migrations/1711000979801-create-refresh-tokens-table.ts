import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRefreshTokensTable1711000979801
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "refreshTokens" (
            "id" uuid DEFAULT uuid_generate_v4(),
            "expiresAt" TIMESTAMP NOT NULL,
            "userId" uuid NOT NULL,
            "createdAt" TIMESTAMP DEFAULT NOW(),
            "updatedAt" TIMESTAMP DEFAULT NOW(),
            CONSTRAINT "refreshTokens_pkey" PRIMARY KEY ("id"),
            CONSTRAINT "users_refreshTokens_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE "refreshTokens";
    `);
  }
}
