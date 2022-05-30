import 'reflect-metadata';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserObject {
  @Field(() => String)
  id: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  name: string;
}
