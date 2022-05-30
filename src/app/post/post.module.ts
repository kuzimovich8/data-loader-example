import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from '@app/post/post.entity';
import { PostResolver } from '@app/post/post.resolver';
import { PostService } from '@app/post/post.service';
import { UserEntity } from '@app/user/user.entity';
import { UserModule } from '@app/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, UserEntity]), UserModule],
  providers: [PostService, PostResolver],
  exports: [PostService],
})
export class PostModule {}
