import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

@InputType()
export class PaginationArgs {
  @Field(() => Int)
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  page: number;

  @Field(() => Int)
  @IsInt()
  @Min(1)
  @IsNotEmpty()
  limit: number;
}
