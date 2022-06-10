import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedCommand } from './seed.command';
import { PostModule } from '@app/post/post.module';

@Module({
  imports: [PostModule],
  providers: [SeedService, SeedCommand],
  exports: [SeedService],
})
export class SeedModule {}
