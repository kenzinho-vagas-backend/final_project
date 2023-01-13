import { MigrationInterface, QueryRunner } from "typeorm";

export class setDefaulForBio1673607347283 implements MigrationInterface {
    name = 'setDefaulForBio1673607347283'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "bio" SET DEFAULT 'Preencha a sua bio'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "bio" DROP DEFAULT`);
    }

}
