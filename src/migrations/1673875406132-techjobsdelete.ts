import { MigrationInterface, QueryRunner } from "typeorm";

export class techjobsdelete1673875406132 implements MigrationInterface {
    name = 'techjobsdelete1673875406132'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "techsJobs" DROP CONSTRAINT "FK_09835822f7bcd833799917e7834"`);
        await queryRunner.query(`ALTER TABLE "techsJobs" ADD CONSTRAINT "FK_09835822f7bcd833799917e7834" FOREIGN KEY ("jobId") REFERENCES "jobs"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "techsJobs" DROP CONSTRAINT "FK_09835822f7bcd833799917e7834"`);
        await queryRunner.query(`ALTER TABLE "techsJobs" ADD CONSTRAINT "FK_09835822f7bcd833799917e7834" FOREIGN KEY ("jobId") REFERENCES "jobs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
