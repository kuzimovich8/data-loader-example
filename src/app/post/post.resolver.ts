import {
  Args,
  Context,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import DataLoader from 'dataloader';
import { Collection } from '@utils/collection';
import { PostObject } from '@app/post/objects/post.object';
import { PostService } from '@app/post/post.service';
import { PostCollectionObject } from '@app/post/objects/postCollection.object';
import { GetPostCollectionArgs } from '@app/post/args/GetPostCollection.args';
import { PostEntity } from '@app/post/post.entity';
import { UserObject } from '@app/user/objects/user.object';
import { UserEntity } from '@app/user/user.entity';
import { UserService } from '@app/user/user.service';
import { PostLoader } from '@app/post/post.loader';
import { memoize } from '@utils/memoize';

@Resolver(PostObject)
export class PostResolver {
  load: (id: string) => UserEntity;

  constructor(
    private readonly postService: PostService,
    private readonly postLoader: PostLoader,
    private readonly userService: UserService,
  ) {
    const getUser = userService.getUserNoCache.bind(userService);
    this.load = memoize<UserEntity>(getUser);
  }

  @Query(() => PostCollectionObject)
  async getPostCollection(
    @Args() args: GetPostCollectionArgs,
  ): Promise<PostCollectionObject> {
    const postEntityCollection: Collection<PostEntity> =
      await this.postService.getPostCollection(args);
    return PostService.collectionToObjectMapper(postEntityCollection);
  }

  @ResolveField('slowUser', () => UserObject)
  async getSlowUser(@Parent() postObject: PostObject) {
    /* no cache */
    const userEntity = await this.userService.getUserNoCache(postObject.userId);

    /* typeorm cache */
    // const userEntity = await this.userService.getUserTypeormCache(postObject.userId);

    /* nestjs cache */
    // const userEntity = await this.userService.getUserNestJSCache(postObject.userId);

    /* getUserNoCache memoization */
    // const userEntity = await this.load(postObject.userId);

    return UserService.entityToObjectMapper(userEntity);
  }

  @ResolveField('fastUser', () => UserObject)
  async getFastUser(
    @Parent() postObject: PostObject,
    // @Context('usersLoader') usersLoader: DataLoader<string, UserEntity>,
  ) {
    // const userEntity = await usersLoader.load(postObject.userId);
    const userEntity = await this.postLoader.batchUsers.load(postObject.userId);
    return UserService.entityToObjectMapper(userEntity);
  }
}
