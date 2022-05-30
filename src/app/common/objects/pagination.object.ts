import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaginationObject {
  @Field(() => Int)
  page: number;

  @Field(() => Int)
  limit: number;

  @Field(() => Int)
  totalItems: number;

  @Field(() => Int)
  totalPages: number;
}
