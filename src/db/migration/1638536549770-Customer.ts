import {MigrationInterface, QueryRunner} from "typeorm";

export class Customer1638536549770 implements MigrationInterface {
    name = 'Customer1638536549770'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "userName" varchar NOT NULL, "firstName" varchar NOT NULL, "lastName" varchar NOT NULL, "age" integer NOT NULL, "password" varchar NOT NULL, "customerId" integer, CONSTRAINT "REL_6c687a8fa35b0ae35ce766b56c" UNIQUE ("customerId"))`);
        await queryRunner.query(`CREATE TABLE "customer" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "customerName" varchar NOT NULL, "customerCountry" varchar NOT NULL, "vatID" varchar NOT NULL, "userId" integer, CONSTRAINT "REL_3f62b42ed23958b120c235f74d" UNIQUE ("userId"))`);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "userName" varchar NOT NULL, "firstName" varchar NOT NULL, "lastName" varchar NOT NULL, "age" integer NOT NULL, "password" varchar NOT NULL, "customerId" integer, CONSTRAINT "REL_6c687a8fa35b0ae35ce766b56c" UNIQUE ("customerId"), CONSTRAINT "FK_6c687a8fa35b0ae35ce766b56ce" FOREIGN KEY ("customerId") REFERENCES "customer" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "userName", "firstName", "lastName", "age", "password", "customerId") SELECT "id", "userName", "firstName", "lastName", "age", "password", "customerId" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
        await queryRunner.query(`CREATE TABLE "temporary_customer" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "customerName" varchar NOT NULL, "customerCountry" varchar NOT NULL, "vatID" varchar NOT NULL, "userId" integer, CONSTRAINT "REL_3f62b42ed23958b120c235f74d" UNIQUE ("userId"), CONSTRAINT "FK_3f62b42ed23958b120c235f74df" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_customer"("id", "customerName", "customerCountry", "vatID", "userId") SELECT "id", "customerName", "customerCountry", "vatID", "userId" FROM "customer"`);
        await queryRunner.query(`DROP TABLE "customer"`);
        await queryRunner.query(`ALTER TABLE "temporary_customer" RENAME TO "customer"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" RENAME TO "temporary_customer"`);
        await queryRunner.query(`CREATE TABLE "customer" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "customerName" varchar NOT NULL, "customerCountry" varchar NOT NULL, "vatID" varchar NOT NULL, "userId" integer, CONSTRAINT "REL_3f62b42ed23958b120c235f74d" UNIQUE ("userId"))`);
        await queryRunner.query(`INSERT INTO "customer"("id", "customerName", "customerCountry", "vatID", "userId") SELECT "id", "customerName", "customerCountry", "vatID", "userId" FROM "temporary_customer"`);
        await queryRunner.query(`DROP TABLE "temporary_customer"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "userName" varchar NOT NULL, "firstName" varchar NOT NULL, "lastName" varchar NOT NULL, "age" integer NOT NULL, "password" varchar NOT NULL, "customerId" integer, CONSTRAINT "REL_6c687a8fa35b0ae35ce766b56c" UNIQUE ("customerId"))`);
        await queryRunner.query(`INSERT INTO "user"("id", "userName", "firstName", "lastName", "age", "password", "customerId") SELECT "id", "userName", "firstName", "lastName", "age", "password", "customerId" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
        await queryRunner.query(`DROP TABLE "customer"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
