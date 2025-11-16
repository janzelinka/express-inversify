import { MigrationInterface, QueryRunner } from "typeorm";

export class User1763307599725 implements MigrationInterface {
    name = 'User1763307599725'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_role" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updatedAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "isActive" boolean NOT NULL DEFAULT (1), "createdBy" varchar, "updatedBy" varchar, "roleName" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_role"("id", "createdAt", "updatedAt", "isActive", "createdBy", "updatedBy", "roleName") SELECT "id", "createdAt", "updatedAt", "isActive", "createdBy", "updatedBy", "roleName" FROM "role"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`ALTER TABLE "temporary_role" RENAME TO "role"`);
        await queryRunner.query(`CREATE TABLE "temporary_role" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updatedAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "isActive" boolean NOT NULL DEFAULT (1), "createdBy" varchar, "updatedBy" varchar, "roleName" varchar NOT NULL, CONSTRAINT "UQ_f4ee91262b2c4ef0e21a88bbcef" UNIQUE ("roleName"))`);
        await queryRunner.query(`INSERT INTO "temporary_role"("id", "createdAt", "updatedAt", "isActive", "createdBy", "updatedBy", "roleName") SELECT "id", "createdAt", "updatedAt", "isActive", "createdBy", "updatedBy", "roleName" FROM "role"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`ALTER TABLE "temporary_role" RENAME TO "role"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role" RENAME TO "temporary_role"`);
        await queryRunner.query(`CREATE TABLE "role" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updatedAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "isActive" boolean NOT NULL DEFAULT (1), "createdBy" varchar, "updatedBy" varchar, "roleName" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "role"("id", "createdAt", "updatedAt", "isActive", "createdBy", "updatedBy", "roleName") SELECT "id", "createdAt", "updatedAt", "isActive", "createdBy", "updatedBy", "roleName" FROM "temporary_role"`);
        await queryRunner.query(`DROP TABLE "temporary_role"`);
        await queryRunner.query(`ALTER TABLE "role" RENAME TO "temporary_role"`);
        await queryRunner.query(`CREATE TABLE "role" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updatedAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "isActive" boolean NOT NULL DEFAULT (1), "createdBy" varchar, "updatedBy" varchar, "roleName" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "role"("id", "createdAt", "updatedAt", "isActive", "createdBy", "updatedBy", "roleName") SELECT "id", "createdAt", "updatedAt", "isActive", "createdBy", "updatedBy", "roleName" FROM "temporary_role"`);
        await queryRunner.query(`DROP TABLE "temporary_role"`);
    }

}
