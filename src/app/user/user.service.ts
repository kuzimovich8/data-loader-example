import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { Repository } from 'typeorm';
import {
  Collection,
  getCollection,
  paginationToObjectMapper,
} from '@utils/collection';
import { UserEntity } from '@app/user/user.entity';
import { UserObject } from '@app/user/objects/user.object';
import { UserCollectionObject } from '@app/user/objects/userCollection.object';
import { GetUserCollectionArgs } from '@app/user/args/GetUserCollection.args';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,

    // @Inject(CACHE_MANAGER)
    // private readonly cacheManager: Cache,
  ) {}

  static entityToObjectMapper(userEntity: UserEntity): UserObject {
    return {
      id: userEntity.id,
      email: userEntity.email,
      name: userEntity.name,
    };
  }

  static collectionToObjectMapper(
    collection: Collection<UserEntity>,
  ): UserCollectionObject {
    return {
      items: collection.items.map((item) =>
        UserService.entityToObjectMapper(item),
      ),
      pagination: paginationToObjectMapper(collection.pagination),
    };
  }

  async getUserCollection(
    args: GetUserCollectionArgs,
  ): Promise<Collection<UserEntity>> {
    const { ids, pagination } = args;

    const queryBuilder = await this.userRepo.createQueryBuilder('user');

    if (ids && ids.length > 0) {
      queryBuilder.andWhere('user.id IN (:...ids)', { ids });
    }

    return await getCollection<UserEntity>({ queryBuilder, pagination });
  }

  async getUser(id: string): Promise<UserEntity> {
    /* typeorm cache */

    // return await this.userRepo.findOne(id, {
    //   cache: { id, milliseconds: 90 * 1000 },
    // });

    /* nestjs cache */

    // const cacheUser = await this.cacheManager.get<UserEntity>(id);
    //
    // if (cacheUser) {
    //   return cacheUser;
    // }
    //
    // // console.log('before findOne(' + id + ')');
    // const user = await this.userRepo.findOne(id);
    // // console.log('after findOne(' + id + ')');
    // await this.cacheManager.set(id, user);
    //
    // return user;

    /* no cache */

    return await this.userRepo.findOne(id);
  }
}
