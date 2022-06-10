import { Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { UserService } from '@app/user/user.service';
import { UserEntity } from '@app/user/user.entity';
import { InjectableForCli } from '@app/common/decorators/injectable-for-cli';

// https://github.com/Pop-Code/nestjs-console/issues/172
@InjectableForCli({ scope: Scope.REQUEST })
export class PostLoader {
  readonly batchUsers: DataLoader<string, UserEntity>;

  constructor(private readonly userService: UserService) {
    console.log('init PostLoader...');
    this.batchUsers = new DataLoader<string, UserEntity>(
      async (keys) => {
        const userEntities = await this.userService.getUserCollection({ ids: [...keys] });

        return keys.map((id) =>
          userEntities.items.find((userEntity) => userEntity.id === id),
        );
      },
    );
  }

  checkConsole() {
    return 'PostLoader works!';
  }
}
