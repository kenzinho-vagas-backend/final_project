import { MigrationInterface, QueryRunner } from "typeorm";

export class setDeleteJobUser1673629660152 implements MigrationInterface {
    name = 'setDeleteJobUser1673629660152'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usersJobs" DROP CONSTRAINT "FK_2b71c5b2b9e7f54b1693c0c5776"`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP CONSTRAINT "FK_8690b1c368a2ec7294969b260af"`);
        await queryRunner.query(`ALTER TABLE "usersJobs" ADD CONSTRAINT "FK_2b71c5b2b9e7f54b1693c0c5776" FOREIGN KEY ("jobId") REFERENCES "jobs"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD CONSTRAINT "FK_8690b1c368a2ec7294969b260af" FOREIGN KEY ("companiesId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jobs" DROP CONSTRAINT "FK_8690b1c368a2ec7294969b260af"`);
        await queryRunner.query(`ALTER TABLE "usersJobs" DROP CONSTRAINT "FK_2b71c5b2b9e7f54b1693c0c5776"`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD CONSTRAINT "FK_8690b1c368a2ec7294969b260af" FOREIGN KEY ("companiesId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usersJobs" ADD CONSTRAINT "FK_2b71c5b2b9e7f54b1693c0c5776" FOREIGN KEY ("jobId") REFERENCES "jobs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
