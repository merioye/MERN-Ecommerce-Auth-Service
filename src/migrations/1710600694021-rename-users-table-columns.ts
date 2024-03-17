import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameUsersTableColumns1710600694021
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE users RENAME COLUMN first_name TO firstName;
        ALTER TABLE users RENAME COLUMN last_name TO lastName;
        ALTER TABLE users RENAME COLUMN phone_no TO phoneNo;
        ALTER TABLE users RENAME COLUMN profile_url TO profileUrl;
        ALTER TABLE users RENAME COLUMN profile_key TO profileKey;
        ALTER TABLE users RENAME COLUMN signup_method TO signupMethod;
        ALTER TABLE users RENAME COLUMN birth_date TO birthDate;
        ALTER TABLE users RENAME COLUMN created_at TO createdAt;
        ALTER TABLE users RENAME COLUMN updated_at TO updatedAt;
        ALTER TABLE users DROP CONSTRAINT users_password_check;
        ALTER TABLE users ADD CONSTRAINT users_password_check CHECK (signupMethod != 'manual' OR password IS NOT NULL);
        ALTER TABLE users DROP CONSTRAINT users_check;
        ALTER TABLE users ADD CONSTRAINT users_birthDate_check CHECK (birthDate > '1900-01-01' AND birthDate <= CURRENT_DATE - INTERVAL '10 years');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE users DROP CONSTRAINT users_birthDate_check;
        ALTER TABLE users ADD CONSTRAINT users_check CHECK (birth_date > '1900-01-01' AND birth_date <= CURRENT_DATE - INTERVAL '10 years');
        ALTER TABLE users DROP CONSTRAINT users_password_check;
        ALTER TABLE users ADD CONSTRAINT users_password_check CHECK (signup_method != 'manual' OR password IS NOT NULL);
        ALTER TABLE users RENAME COLUMN updatedAt TO updated_at;
        ALTER TABLE users RENAME COLUMN createdAt TO created_at;
        ALTER TABLE users RENAME COLUMN birthDate TO birth_date;
        ALTER TABLE users RENAME COLUMN signupMethod TO signup_method;
        ALTER TABLE users RENAME COLUMN profileKey TO profile_key;
        ALTER TABLE users RENAME COLUMN profileUrl TO profile_url;
        ALTER TABLE users RENAME COLUMN phoneNo TO phone_no;
        ALTER TABLE users RENAME COLUMN lastName TO last_name;
        ALTER TABLE users RENAME COLUMN firstName TO first_name;
    `);
  }
}
