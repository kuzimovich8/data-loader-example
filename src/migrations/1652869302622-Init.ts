import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1652869302622 implements MigrationInterface {
    name = 'Init1652869302622'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "User" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "email" character varying(128) NOT NULL, "name" character varying(128) NOT NULL, CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Post" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "text" text NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_c4d3b3dcd73db0b0129ea829f9f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Post" ADD CONSTRAINT "FK_97e81bcb59530bfb061e48aee6a" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Post" DROP CONSTRAINT "FK_97e81bcb59530bfb061e48aee6a"`);
        await queryRunner.query(`DROP TABLE "Post"`);
        await queryRunner.query(`DROP TABLE "User"`);
    }

}
