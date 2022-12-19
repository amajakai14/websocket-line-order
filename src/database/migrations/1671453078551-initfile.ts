import { MigrationInterface, QueryRunner } from "typeorm";

export class initfile1671453078551 implements MigrationInterface {
    name = 'initfile1671453078551'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "mock_course_availability" ("id" SERIAL NOT NULL, "customerId" integer NOT NULL, "courseId" integer NOT NULL, CONSTRAINT "PK_acbc50406ec87f8c81bcd399058" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."mock_channel_provider_status_enum" AS ENUM('EMPTY', 'USING', 'PAYMENT')`);
        await queryRunner.query(`CREATE TABLE "mock_channel_provider" ("channel_id" SERIAL NOT NULL, "table_id" integer NOT NULL, "course_id" integer NOT NULL, "status" "public"."mock_channel_provider_status_enum" NOT NULL, "time_start" TIMESTAMP NOT NULL DEFAULT NOW(), "time_end" TIMESTAMP, CONSTRAINT "PK_dc78e1ff74debc04545718ae1a1" PRIMARY KEY ("channel_id"))`);
        await queryRunner.query(`CREATE TABLE "mock_customer" ("customer_id" SERIAL NOT NULL, "login_id" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "PK_fecdb93d10e62a9e3e0c2f392e1" PRIMARY KEY ("customer_id"))`);
        await queryRunner.query(`CREATE TABLE "mock_order" ("order_id" SERIAL NOT NULL, "menu_id" character varying NOT NULL, "order_amount" integer NOT NULL, "total_price" integer NOT NULL, "channel_id" character varying NOT NULL, "process_type" character varying NOT NULL, "register_time" TIMESTAMP NOT NULL DEFAULT NOW(), "update_time" TIMESTAMP, CONSTRAINT "PK_ace5f2f5d3b6d05a94ae2095672" PRIMARY KEY ("order_id"))`);
        await queryRunner.query(`CREATE TABLE "mock_course" ("course_id" SERIAL NOT NULL, "course_name" character varying NOT NULL, "course_timelimit" integer NOT NULL, "course_priority" integer NOT NULL, CONSTRAINT "PK_3d66d976c4f08f72677cb132580" PRIMARY KEY ("course_id"))`);
        await queryRunner.query(`CREATE TABLE "mock_session" ("session_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "customer_id" integer NOT NULL, "expire_datetime" TIMESTAMP NOT NULL DEFAULT NOW() + INTERVAL '24 hours', CONSTRAINT "PK_8c8c0902b3d28c07fe9c4f0b7b2" PRIMARY KEY ("session_id"))`);
        await queryRunner.query(`CREATE TABLE "mock_menu" ("menu_id" SERIAL NOT NULL, "menu_name" character varying NOT NULL, "menu_type" character varying NOT NULL, "price" integer NOT NULL, "available" boolean NOT NULL, "course_id" integer NOT NULL, CONSTRAINT "PK_74d4967d903beda77494b691fbd" PRIMARY KEY ("menu_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "mock_menu"`);
        await queryRunner.query(`DROP TABLE "mock_session"`);
        await queryRunner.query(`DROP TABLE "mock_course"`);
        await queryRunner.query(`DROP TABLE "mock_order"`);
        await queryRunner.query(`DROP TABLE "mock_customer"`);
        await queryRunner.query(`DROP TABLE "mock_channel_provider"`);
        await queryRunner.query(`DROP TYPE "public"."mock_channel_provider_status_enum"`);
        await queryRunner.query(`DROP TABLE "mock_course_availability"`);
    }

}
