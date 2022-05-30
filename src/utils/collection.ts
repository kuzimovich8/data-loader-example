import { SelectQueryBuilder } from 'typeorm';
import { PaginationObject } from '@app/common/objects/pagination.object';
import { PaginationArgs } from '@app/common/args/pagination.args';

export interface Collection<T> {
  items: T[];
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

export interface GetCollectionArgs<T> {
  queryBuilder: SelectQueryBuilder<T>;
  pagination?: PaginationArgs;
}

export const paginationToObjectMapper = (
  pagination: Pagination,
): PaginationObject => ({
  page: pagination.page,
  limit: pagination.limit,
  totalItems: pagination.totalItems,
  totalPages: pagination.totalPages,
});

export const getCollection = async <Entity>(
  args: GetCollectionArgs<Entity>,
): Promise<Collection<Entity>> => {
  const { queryBuilder, pagination } = args;

  if (pagination) {
    const { page, limit } = pagination;

    queryBuilder.take(limit).skip(limit * (page - 1));
  }

  const [items, totalItems] = await queryBuilder.getManyAndCount();

  return {
    items,
    pagination: {
      page: pagination?.page || 1,
      limit: pagination?.limit || totalItems,
      totalItems,
      totalPages: Math.ceil(totalItems / pagination?.limit || totalItems),
    },
  };
};
