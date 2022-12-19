import { MigrationInterface, QueryRunner } from "typeorm";

export class addenum1671453485019 implements MigrationInterface {
    name = 'addenum1671453485019'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mock_menu" DROP COLUMN "menu_type"`);
        await queryRunner.query(`CREATE TYPE "public"."mock_menu_menu_type_enum" AS ENUM('0', '1', '2', '3')`);
        await queryRunner.query(`ALTER TABLE "mock_menu" ADD "menu_type" "public"."mock_menu_menu_type_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "mock_menu" ALTER COLUMN "price" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "mock_menu" ALTER COLUMN "available" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "mock_session" ALTER COLUMN "expire_datetime" SET DEFAULT NOW() + INTERVAL '24 hours'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "mock_session" ALTER COLUMN "expire_datetime" SET DEFAULT (now() + '24:00:00')`);
        await queryRunner.query(`ALTER TABLE "mock_menu" ALTER COLUMN "available" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "mock_menu" ALTER COLUMN "price" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "mock_menu" DROP COLUMN "menu_type"`);
        await queryRunner.query(`DROP TYPE "public"."mock_menu_menu_type_enum"`);
        await queryRunner.query(`ALTER TABLE "mock_menu" ADD "menu_type" character varying NOT NULL`);
    }

}
