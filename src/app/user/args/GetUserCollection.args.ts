import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { PaginationArgs } from '@app/common/args/pagination.args';

@ArgsType()
export class GetUserCollectionArgs {
  @Field(() => PaginationArgs, { nullable: true })
  pagination?: PaginationArgs;

  @Field(() => [String], { nullable: true })
  @IsUUID('4', { each: true })
  @IsString({ each: true })
  @IsOptional()
  ids?: string[];
}
