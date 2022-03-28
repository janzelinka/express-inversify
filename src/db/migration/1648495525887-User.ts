import {MigrationInterface, QueryRunner} from "typeorm";

export class User1648495525887 implements MigrationInterface {
    name = 'User1648495525887'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_customer" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "customerName" varchar NOT NULL, "customerCountry" varchar NOT NULL, "vatID" varchar NOT NULL, "userId" integer, CONSTRAINT "REL_3f62b42ed23958b120c235f74d" UNIQUE ("userId"))`);
        await queryRunner.query(`INSERT INTO "temporary_customer"("id", "customerName", "customerCountry", "vatID", "userId") SELECT "id", "customerName", "customerCountry", "vatID", "userId" FROM "customer"`);
        await queryRunner.query(`DROP TABLE "customer"`);
        await queryRunner.query(`ALTER TABLE "temporary_customer" RENAME TO "customer"`);
        await queryRunner.query(`CREATE TABLE "temporary_customer" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "customerName" varchar NOT NULL, "customerCountry" varchar NOT NULL, "vatID" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_customer"("id", "customerName", "customerCountry", "vatID") SELECT "id", "customerName", "customerCountry", "vatID" FROM "customer"`);
        await queryRunner.query(`DROP TABLE "customer"`);
        await queryRunner.query(`ALTER TABLE "temporary_customer" RENAME TO "customer"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" RENAME TO "temporary_customer"`);
        await queryRunner.query(`CREATE TABLE "customer" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "customerName" varchar NOT NULL, "customerCountry" varchar NOT NULL, "vatID" varchar NOT NULL, "userId" integer, CONSTRAINT "REL_3f62b42ed23958b120c235f74d" UNIQUE ("userId"))`);
        await queryRunner.query(`INSERT INTO "customer"("id", "customerName", "customerCountry", "vatID") SELECT "id", "customerName", "customerCountry", "vatID" FROM "temporary_customer"`);
        await queryRunner.query(`DROP TABLE "temporary_customer"`);
        await queryRunner.query(`ALTER TABLE "customer" RENAME TO "temporary_customer"`);
        await queryRunner.query(`CREATE TABLE "customer" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "customerName" varchar NOT NULL, "customerCountry" varchar NOT NULL, "vatID" varchar NOT NULL, "userId" integer, CONSTRAINT "REL_3f62b42ed23958b120c235f74d" UNIQUE ("userId"), CONSTRAINT "FK_3f62b42ed23958b120c235f74df" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "customer"("id", "customerName", "customerCountry", "vatID", "userId") SELECT "id", "customerName", "customerCountry", "vatID", "userId" FROM "temporary_customer"`);
        await queryRunner.query(`DROP TABLE "temporary_customer"`);
    }

}
