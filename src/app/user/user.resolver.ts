import { Inject, UseGuards } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Connection } from 'typeorm';
import { Collection } from '@utils/collection';
import { UserObject } from '@app/user/objects/user.object';
import { UserService } from '@app/user/user.service';
import { UserCollectionObject } from '@app/user/objects/userCollection.object';
import { GetUserCollectionArgs } from '@app/user/args/GetUserCollection.args';
import { UserEntity } from '@app/user/user.entity';

@Resolver(UserObject)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserCollectionObject)
  async getStateCollection(
    @Args() args: GetUserCollectionArgs,
  ): Promise<UserCollectionObject> {
    const userEntityCollection: Collection<UserEntity> =
      await this.userService.getUserCollection(args);
    return UserService.collectionToObjectMapper(userEntityCollection);
  }
}
