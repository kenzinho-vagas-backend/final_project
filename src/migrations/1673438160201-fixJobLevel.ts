import { MigrationInterface, QueryRunner } from "typeorm";

export class fixJobLevel1673438160201 implements MigrationInterface {
    name = 'fixJobLevel1673438160201'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "job_level" TO "jobLevel"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "jobLevel" TO "job_level"`);
    }

}
