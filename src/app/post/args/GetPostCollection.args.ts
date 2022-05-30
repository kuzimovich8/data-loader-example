import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';
import { PaginationArgs } from '@app/common/args/pagination.args';

@ArgsType()
export class GetPostCollectionArgs {
  @Field(() => PaginationArgs, { nullable: true })
  pagination?: PaginationArgs;

  @Field(() => [String], { nullable: true })
  @IsString({ each: true })
  @IsOptional()
  ids?: string[];
}
