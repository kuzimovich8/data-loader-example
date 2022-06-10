import { Inject, Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { faker } from '@faker-js/faker';
import { UserEntity } from '@app/user/user.entity';
import { PostLoader } from '@app/post/post.loader';

@Injectable()
export class SeedService {
  constructor(
    @Inject(Connection)
    private readonly connection: Connection,

    private readonly postLoader: PostLoader,
  ) {}

  async seedDb() {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(
        UserEntity,
        [...new Array(100)].map(() => ({
          email: faker.internet.email(),
          name: faker.name.findName(),

          posts: [
            ...new Array(Math.round(Math.random() * (200 - 50) + 50)),
          ].map(() => ({
            text: faker.lorem.text(),
          })),
        })),
      );

      this.postLoader.checkConsole();

      console.log(`Success!`);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      console.log(err);
    } finally {
      await queryRunner.release();
    }
  }

  async pruneDb() {
    await this.connection.dropDatabase();
  }
}
