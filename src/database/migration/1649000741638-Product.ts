import {MigrationInterface, QueryRunner} from "typeorm";

export class Product1649000741638 implements MigrationInterface {
    name = 'Product1649000741638'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "type" integer NOT NULL, "price" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "dynamic_attribute" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "value" varchar NOT NULL, "productId" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_dynamic_attribute" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "value" varchar NOT NULL, "productId" integer, CONSTRAINT "FK_f1c97fb7c50dd32c304e0230a67" FOREIGN KEY ("productId") REFERENCES "product" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_dynamic_attribute"("id", "value", "productId") SELECT "id", "value", "productId" FROM "dynamic_attribute"`);
        await queryRunner.query(`DROP TABLE "dynamic_attribute"`);
        await queryRunner.query(`ALTER TABLE "temporary_dynamic_attribute" RENAME TO "dynamic_attribute"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dynamic_attribute" RENAME TO "temporary_dynamic_attribute"`);
        await queryRunner.query(`CREATE TABLE "dynamic_attribute" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "value" varchar NOT NULL, "productId" integer)`);
        await queryRunner.query(`INSERT INTO "dynamic_attribute"("id", "value", "productId") SELECT "id", "value", "productId" FROM "temporary_dynamic_attribute"`);
        await queryRunner.query(`DROP TABLE "temporary_dynamic_attribute"`);
        await queryRunner.query(`DROP TABLE "dynamic_attribute"`);
        await queryRunner.query(`DROP TABLE "product"`);
    }

}
