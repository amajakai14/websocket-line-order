import { MigrationInterface, QueryRunner } from "typeorm";

export class add1671488211211 implements MigrationInterface {
    name = 'add1671488211211'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mock_session" ALTER COLUMN "expire_datetime" SET DEFAULT NOW() + INTERVAL '24 hours'`);
        await queryRunner.query(`ALTER TABLE "mock_customer" ADD CONSTRAINT "UQ_8843d7e2ae79d6f136a3dc00219" UNIQUE ("login_id", "email")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mock_customer" DROP CONSTRAINT "UQ_8843d7e2ae79d6f136a3dc00219"`);
        await queryRunner.query(`ALTER TABLE "mock_session" ALTER COLUMN "expire_datetime" SET DEFAULT (now() + '24:00:00')`);
    }

}
