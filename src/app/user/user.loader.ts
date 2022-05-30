import * as DataLoader from 'dataloader';
import { UserService } from '@app/user/user.service';
import { UserEntity } from '@app/user/user.entity';

export const createUsersLoader = (userService: UserService) => {
  return new DataLoader<string, UserEntity>(async (ids: string[]) => {
    const userEntities = await userService.getUserCollection({ ids });

    return ids.map((id) =>
      userEntities.items.find((userEntity) => userEntity.id === id),
    );
  });
};
