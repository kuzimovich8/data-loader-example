import { Field, ObjectType } from '@nestjs/graphql';
import { PaginationObject } from '@app/common/objects/pagination.object';
import { UserObject } from './user.object';

@ObjectType()
export class UserCollectionObject {
  @Field(() => [UserObject])
  items: UserObject[];

  @Field(() => PaginationObject)
  pagination: PaginationObject;
}
