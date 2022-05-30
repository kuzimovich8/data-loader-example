import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@app/user/user.entity';
import { UserService } from '@app/user/user.service';
import { UserResolver } from '@app/user/user.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    // CacheModule.register({ ttl: 120, max: 10000 }),
  ],
  providers: [UserService, UserResolver],
  exports: [UserService, UserResolver],
})
export class UserModule {}
