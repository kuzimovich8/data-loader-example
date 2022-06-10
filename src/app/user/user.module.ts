import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// import * as redisStore from 'cache-manager-redis-store';

import { UserEntity } from '@app/user/user.entity';
import { UserService } from '@app/user/user.service';
import { UserResolver } from '@app/user/user.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    CacheModule.register({ ttl: 90, max: 10000 }),
    // CacheModule.register({
    //   ttl: 90,
    //   max: 1000,
    //   store: redisStore,
    //   socket: { host: 'localhost', port: 6379 },
    // }),
  ],
  providers: [UserService, UserResolver],
  exports: [UserService, UserResolver],
})
export class UserModule {}
