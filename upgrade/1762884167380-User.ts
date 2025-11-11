import { MigrationInterface, QueryRunner } from "typeorm";

export class User1762884167380 implements MigrationInterface {
    name = 'User1762884167380'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "userName" varchar(50) NOT NULL, "firstName" varchar, "lastName" varchar, "age" varchar, "password" varchar NOT NULL, "salt" varchar NOT NULL, CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80" UNIQUE ("userName"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
