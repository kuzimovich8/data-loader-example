import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationObject } from '@app/common/objects/pagination.object';
import { PostObject } from '@app/post/objects/post.object';

@ObjectType()
export class PostCollectionObject {
  @Field(() => [PostObject])
  items: PostObject[];

  @Field(() => PaginationObject)
  pagination: PaginationObject;
}
