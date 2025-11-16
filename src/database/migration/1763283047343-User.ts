import { MigrationInterface, QueryRunner } from "typeorm";

export class User1763283047343 implements MigrationInterface {
    name = 'User1763283047343'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "customer" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updatedAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "isActive" boolean NOT NULL DEFAULT (1), "createdBy" varchar, "updatedBy" varchar, "customerName" varchar NOT NULL, "customerCountry" varchar NOT NULL, "vatID" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "role" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updatedAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "isActive" boolean NOT NULL DEFAULT (1), "createdBy" varchar, "updatedBy" varchar, "roleName" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "user" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updatedAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "isActive" boolean NOT NULL DEFAULT (1), "createdBy" varchar, "updatedBy" varchar, "userName" varchar(50) NOT NULL, "firstName" varchar, "lastName" varchar, "age" varchar, "password" varchar NOT NULL, "salt" varchar NOT NULL, "customerId" varchar, "roleId" varchar, CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80" UNIQUE ("userName"))`);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updatedAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "isActive" boolean NOT NULL DEFAULT (1), "createdBy" varchar, "updatedBy" varchar, "userName" varchar(50) NOT NULL, "firstName" varchar, "lastName" varchar, "age" varchar, "password" varchar NOT NULL, "salt" varchar NOT NULL, "customerId" varchar, "roleId" varchar, CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80" UNIQUE ("userName"), CONSTRAINT "FK_6c687a8fa35b0ae35ce766b56ce" FOREIGN KEY ("customerId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "createdAt", "updatedAt", "isActive", "createdBy", "updatedBy", "userName", "firstName", "lastName", "age", "password", "salt", "customerId", "roleId") SELECT "id", "createdAt", "updatedAt", "isActive", "createdBy", "updatedBy", "userName", "firstName", "lastName", "age", "password", "salt", "customerId", "roleId" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updatedAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "isActive" boolean NOT NULL DEFAULT (1), "createdBy" varchar, "updatedBy" varchar, "userName" varchar(50) NOT NULL, "firstName" varchar, "lastName" varchar, "age" varchar, "password" varchar NOT NULL, "salt" varchar NOT NULL, "customerId" varchar, "roleId" varchar, CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80" UNIQUE ("userName"))`);
        await queryRunner.query(`INSERT INTO "user"("id", "createdAt", "updatedAt", "isActive", "createdBy", "updatedBy", "userName", "firstName", "lastName", "age", "password", "salt", "customerId", "roleId") SELECT "id", "createdAt", "updatedAt", "isActive", "createdBy", "updatedBy", "userName", "firstName", "lastName", "age", "password", "salt", "customerId", "roleId" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "customer"`);
    }

}
