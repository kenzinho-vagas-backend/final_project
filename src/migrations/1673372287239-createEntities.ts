import { MigrationInterface, QueryRunner } from "typeorm";

export class createEntities1673372287239 implements MigrationInterface {
    name = 'createEntities1673372287239'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "technologies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tech" character varying NOT NULL, CONSTRAINT "UQ_83fd8c495b164d65c496376e101" UNIQUE ("tech"), CONSTRAINT "PK_9a97465b79568f00becacdd4e4a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "techsJobs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "technologyId" uuid, "jobId" uuid, CONSTRAINT "PK_40992a68aa825903fe8259598b9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "isAdm" boolean NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "linkedin" character varying NOT NULL, "bio" character varying, "specialty" character varying NOT NULL, "job_level" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usersJobs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid, "jobId" uuid, CONSTRAINT "PK_bfa4c2bc785fb1d906776bb8874" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "jobs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "wage" character varying NOT NULL, "modality" character varying NOT NULL, "jobLevel" character varying NOT NULL, "jobUrl" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "companiesId" uuid, CONSTRAINT "PK_cf0a6c42b72fcc7f7c237def345" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "companies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "companyName" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_d4bc3e82a314fa9e29f652c2c22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "techsJobs" ADD CONSTRAINT "FK_1c0bc2b87b9d44d691f25526488" FOREIGN KEY ("technologyId") REFERENCES "technologies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "techsJobs" ADD CONSTRAINT "FK_09835822f7bcd833799917e7834" FOREIGN KEY ("jobId") REFERENCES "jobs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usersJobs" ADD CONSTRAINT "FK_6d69832f8e44dd010a8d0547688" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usersJobs" ADD CONSTRAINT "FK_2b71c5b2b9e7f54b1693c0c5776" FOREIGN KEY ("jobId") REFERENCES "jobs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "jobs" ADD CONSTRAINT "FK_8690b1c368a2ec7294969b260af" FOREIGN KEY ("companiesId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "companies" ADD CONSTRAINT "FK_6d64e8c7527a9e4af83cc66cbf7" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" DROP CONSTRAINT "FK_6d64e8c7527a9e4af83cc66cbf7"`);
        await queryRunner.query(`ALTER TABLE "jobs" DROP CONSTRAINT "FK_8690b1c368a2ec7294969b260af"`);
        await queryRunner.query(`ALTER TABLE "usersJobs" DROP CONSTRAINT "FK_2b71c5b2b9e7f54b1693c0c5776"`);
        await queryRunner.query(`ALTER TABLE "usersJobs" DROP CONSTRAINT "FK_6d69832f8e44dd010a8d0547688"`);
        await queryRunner.query(`ALTER TABLE "techsJobs" DROP CONSTRAINT "FK_09835822f7bcd833799917e7834"`);
        await queryRunner.query(`ALTER TABLE "techsJobs" DROP CONSTRAINT "FK_1c0bc2b87b9d44d691f25526488"`);
        await queryRunner.query(`DROP TABLE "companies"`);
        await queryRunner.query(`DROP TABLE "jobs"`);
        await queryRunner.query(`DROP TABLE "usersJobs"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "techsJobs"`);
        await queryRunner.query(`DROP TABLE "technologies"`);
    }

}
