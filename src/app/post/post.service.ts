import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import {
  Collection,
  getCollection,
  paginationToObjectMapper,
} from '@utils/collection';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from '@app/post/post.entity';
import { PostObject } from '@app/post/objects/post.object';
import { PostCollectionObject } from '@app/post/objects/postCollection.object';
import { GetPostCollectionArgs } from '@app/post/args/GetPostCollection.args';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepo: Repository<PostEntity>,
  ) {}

  static entityToObjectMapper(postEntity: PostEntity): PostObject {
    return {
      id: postEntity.id,
      text: postEntity.text,
      userId: postEntity.userId,
    };
  }

  static collectionToObjectMapper(
    collection: Collection<PostEntity>,
  ): PostCollectionObject {
    return {
      items: collection.items.map((item) =>
        PostService.entityToObjectMapper(item),
      ),
      pagination: paginationToObjectMapper(collection.pagination),
    };
  }

  async getPostCollection(
    args: GetPostCollectionArgs,
  ): Promise<Collection<PostEntity>> {
    const { ids, pagination } = args;

    const queryBuilder = await this.postRepo.createQueryBuilder('post');

    if (ids && ids.length > 0) {
      queryBuilder.andWhere('post.id IN (:...ids)', { ids });
    }

    return await getCollection<PostEntity>({ queryBuilder, pagination });
  }
}
