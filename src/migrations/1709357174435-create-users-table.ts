import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1709357174435 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TYPE SIGNUP_METHOD AS ENUM ('manual', 'google', 'facebook');
        CREATE TYPE ROLE AS ENUM ('admin', 'seller', 'customer');
        CREATE TABLE users (
            id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
            first_name VARCHAR(20) NOT NULL,
            last_name VARCHAR(20) NOT NULL,
            email VARCHAR(100) NOT NULL UNIQUE,
            phone_no VARCHAR(20) DEFAULT '',
            profile_url TEXT,
            profile_key TEXT,
            signup_method SIGNUP_METHOD DEFAULT 'manual',
            role ROLE DEFAULT 'customer',
            password TEXT CHECK (signup_method != 'manual' OR password IS NOT NULL),
            birth_date DATE CHECK (birth_date > '1900-01-01' AND birth_date <= CURRENT_DATE - INTERVAL '10 years'),
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE users;
        DROP TYPE ROLE;
        DROP TYPE SIGNUP_METHOD;
    `);
  }
}
