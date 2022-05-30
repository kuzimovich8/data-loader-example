import 'reflect-metadata';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PostObject {
  @Field(() => String)
  id: string;

  @Field(() => String)
  text: string;

  @Field(() => String)
  userId: string;
}
