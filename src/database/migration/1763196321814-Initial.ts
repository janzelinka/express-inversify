import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1763196321814 implements MigrationInterface {
    name = 'Initial1763196321814'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_customer" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "customerName" varchar NOT NULL, "customerCountry" varchar NOT NULL, "vatID" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updatedAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "isActive" boolean NOT NULL DEFAULT (1), "createdBy" varchar, "updatedBy" varchar)`);
        await queryRunner.query(`INSERT INTO "temporary_customer"("id", "customerName", "customerCountry", "vatID") SELECT "id", "customerName", "customerCountry", "vatID" FROM "customer"`);
        await queryRunner.query(`DROP TABLE "customer"`);
        await queryRunner.query(`ALTER TABLE "temporary_customer" RENAME TO "customer"`);
        await queryRunner.query(`CREATE TABLE "temporary_role" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "roleName" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updatedAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "isActive" boolean NOT NULL DEFAULT (1), "createdBy" varchar, "updatedBy" varchar)`);
        await queryRunner.query(`INSERT INTO "temporary_role"("id", "roleName") SELECT "id", "roleName" FROM "role"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`ALTER TABLE "temporary_role" RENAME TO "role"`);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "userName" varchar(50) NOT NULL, "firstName" varchar, "lastName" varchar, "age" varchar, "password" varchar NOT NULL, "salt" varchar NOT NULL, "customerId" integer, "roleId" integer, "createdAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updatedAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "isActive" boolean NOT NULL DEFAULT (1), "createdBy" varchar, "updatedBy" varchar, CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80" UNIQUE ("userName"), CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_6c687a8fa35b0ae35ce766b56ce" FOREIGN KEY ("customerId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "userName", "firstName", "lastName", "age", "password", "salt", "customerId", "roleId") SELECT "id", "userName", "firstName", "lastName", "age", "password", "salt", "customerId", "roleId" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
        await queryRunner.query(`CREATE TABLE "temporary_customer" ("id" varchar PRIMARY KEY NOT NULL, "customerName" varchar NOT NULL, "customerCountry" varchar NOT NULL, "vatID" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updatedAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "isActive" boolean NOT NULL DEFAULT (1), "createdBy" varchar, "updatedBy" varchar)`);
        await queryRunner.query(`INSERT INTO "temporary_customer"("id", "customerName", "customerCountry", "vatID", "createdAt", "updatedAt", "isActive", "createdBy", "updatedBy") SELECT "id", "customerName", "customerCountry", "vatID", "createdAt", "updatedAt", "isActive", "createdBy", "updatedBy" FROM "customer"`);
        await queryRunner.query(`DROP TABLE "customer"`);
        await queryRunner.query(`ALTER TABLE "temporary_customer" RENAME TO "customer"`);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "userName" varchar(50) NOT NULL, "firstName" varchar, "lastName" varchar, "age" varchar, "password" varchar NOT NULL, "salt" varchar NOT NULL, "customerId" integer, "roleId" integer, "createdAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updatedAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "isActive" boolean NOT NULL DEFAULT (1), "createdBy" varchar, "updatedBy" varchar, CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80" UNIQUE ("userName"))`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "userName", "firstName", "lastName", "age", "password", "salt", "customerId", "roleId", "createdAt", "updatedAt", "isActive", "createdBy", "updatedBy") SELECT "id", "userName", "firstName", "lastName", "age", "password", "salt", "customerId", "roleId", "createdAt", "updatedAt", "isActive", "createdBy", "updatedBy" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
        await queryRunner.query(`CREATE TABLE "temporary_role" ("id" varchar PRIMARY KEY NOT NULL, "roleName" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updatedAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "isActive" boolean NOT NULL DEFAULT (1), "createdBy" varchar, "updatedBy" varchar)`);
        await queryRunner.query(`INSERT INTO "temporary_role"("id", "roleName", "createdAt", "updatedAt", "isActive", "createdBy", "updatedBy") SELECT "id", "roleName", "createdAt", "updatedAt", "isActive", "createdBy", "updatedBy" FROM "role"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`ALTER TABLE "temporary_role" RENAME TO "role"`);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" varchar PRIMARY KEY NOT NULL, "userName" varchar(50) NOT NULL, "firstName" varchar, "lastName" varchar, "age" varchar, "password" varchar NOT NULL, "salt" varchar NOT NULL, "customerId" varchar, "roleId" varchar, "createdAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updatedAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "isActive" boolean NOT NULL DEFAULT (1), "createdBy" varchar, "updatedBy" varchar, CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80" UNIQUE ("userName"))`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "userName", "firstName", "lastName", "age", "password", "salt", "customerId", "roleId", "createdAt", "updatedAt", "isActive", "createdBy", "updatedBy") SELECT "id", "userName", "firstName", "lastName", "age", "password", "salt", "customerId", "roleId", "createdAt", "updatedAt", "isActive", "createdBy", "updatedBy" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" varchar PRIMARY KEY NOT NULL, "userName" varchar(50) NOT NULL, "firstName" varchar, "lastName" varchar, "age" varchar, "password" varchar NOT NULL, "salt" varchar NOT NULL, "customerId" varchar, "roleId" varchar, "createdAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updatedAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "isActive" boolean NOT NULL DEFAULT (1), "createdBy" varchar, "updatedBy" varchar, CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80" UNIQUE ("userName"), CONSTRAINT "FK_6c687a8fa35b0ae35ce766b56ce" FOREIGN KEY ("customerId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "userName", "firstName", "lastName", "age", "password", "salt", "customerId", "roleId", "createdAt", "updatedAt", "isActive", "createdBy", "updatedBy") SELECT "id", "userName", "firstName", "lastName", "age", "password", "salt", "customerId", "roleId", "createdAt", "updatedAt", "isActive", "createdBy", "updatedBy" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" varchar PRIMARY KEY NOT NULL, "userName" varchar(50) NOT NULL, "firstName" varchar, "lastName" varchar, "age" varchar, "password" varchar NOT NULL, "salt" varchar NOT NULL, "customerId" varchar, "roleId" varchar, "createdAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updatedAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "isActive" boolean NOT NULL DEFAULT (1), "createdBy" varchar, "updatedBy" varchar, CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80" UNIQUE ("userName"))`);
        await queryRunner.query(`INSERT INTO "user"("id", "userName", "firstName", "lastName", "age", "password", "salt", "customerId", "roleId", "createdAt", "updatedAt", "isActive", "createdBy", "updatedBy") SELECT "id", "userName", "firstName", "lastName", "age", "password", "salt", "customerId", "roleId", "createdAt", "updatedAt", "isActive", "createdBy", "updatedBy" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "userName" varchar(50) NOT NULL, "firstName" varchar, "lastName" varchar, "age" varchar, "password" varchar NOT NULL, "salt" varchar NOT NULL, "customerId" integer, "roleId" integer, "createdAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updatedAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "isActive" boolean NOT NULL DEFAULT (1), "createdBy" varchar, "updatedBy" varchar, CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80" UNIQUE ("userName"))`);
        await queryRunner.query(`INSERT INTO "user"("id", "userName", "firstName", "lastName", "age", "password", "salt", "customerId", "roleId", "createdAt", "updatedAt", "isActive", "createdBy", "updatedBy") SELECT "id", "userName", "firstName", "lastName", "age", "password", "salt", "customerId", "roleId", "createdAt", "updatedAt", "isActive", "createdBy", "updatedBy" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
        await queryRunner.query(`ALTER TABLE "role" RENAME TO "temporary_role"`);
        await queryRunner.query(`CREATE TABLE "role" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "roleName" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updatedAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "isActive" boolean NOT NULL DEFAULT (1), "createdBy" varchar, "updatedBy" varchar)`);
        await queryRunner.query(`INSERT INTO "role"("id", "roleName", "createdAt", "updatedAt", "isActive", "createdBy", "updatedBy") SELECT "id", "roleName", "createdAt", "updatedAt", "isActive", "createdBy", "updatedBy" FROM "temporary_role"`);
        await queryRunner.query(`DROP TABLE "temporary_role"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "userName" varchar(50) NOT NULL, "firstName" varchar, "lastName" varchar, "age" varchar, "password" varchar NOT NULL, "salt" varchar NOT NULL, "customerId" integer, "roleId" integer, "createdAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updatedAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "isActive" boolean NOT NULL DEFAULT (1), "createdBy" varchar, "updatedBy" varchar, CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80" UNIQUE ("userName"), CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "user"("id", "userName", "firstName", "lastName", "age", "password", "salt", "customerId", "roleId", "createdAt", "updatedAt", "isActive", "createdBy", "updatedBy") SELECT "id", "userName", "firstName", "lastName", "age", "password", "salt", "customerId", "roleId", "createdAt", "updatedAt", "isActive", "createdBy", "updatedBy" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
        await queryRunner.query(`ALTER TABLE "customer" RENAME TO "temporary_customer"`);
        await queryRunner.query(`CREATE TABLE "customer" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "customerName" varchar NOT NULL, "customerCountry" varchar NOT NULL, "vatID" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updatedAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "isActive" boolean NOT NULL DEFAULT (1), "createdBy" varchar, "updatedBy" varchar)`);
        await queryRunner.query(`INSERT INTO "customer"("id", "customerName", "customerCountry", "vatID", "createdAt", "updatedAt", "isActive", "createdBy", "updatedBy") SELECT "id", "customerName", "customerCountry", "vatID", "createdAt", "updatedAt", "isActive", "createdBy", "updatedBy" FROM "temporary_customer"`);
        await queryRunner.query(`DROP TABLE "temporary_customer"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "userName" varchar(50) NOT NULL, "firstName" varchar, "lastName" varchar, "age" varchar, "password" varchar NOT NULL, "salt" varchar NOT NULL, "customerId" integer, "roleId" integer, CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80" UNIQUE ("userName"), CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_6c687a8fa35b0ae35ce766b56ce" FOREIGN KEY ("customerId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "user"("id", "userName", "firstName", "lastName", "age", "password", "salt", "customerId", "roleId") SELECT "id", "userName", "firstName", "lastName", "age", "password", "salt", "customerId", "roleId" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
        await queryRunner.query(`ALTER TABLE "role" RENAME TO "temporary_role"`);
        await queryRunner.query(`CREATE TABLE "role" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "roleName" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "role"("id", "roleName") SELECT "id", "roleName" FROM "temporary_role"`);
        await queryRunner.query(`DROP TABLE "temporary_role"`);
        await queryRunner.query(`ALTER TABLE "customer" RENAME TO "temporary_customer"`);
        await queryRunner.query(`CREATE TABLE "customer" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "customerName" varchar NOT NULL, "customerCountry" varchar NOT NULL, "vatID" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "customer"("id", "customerName", "customerCountry", "vatID") SELECT "id", "customerName", "customerCountry", "vatID" FROM "temporary_customer"`);
        await queryRunner.query(`DROP TABLE "temporary_customer"`);
    }

}
