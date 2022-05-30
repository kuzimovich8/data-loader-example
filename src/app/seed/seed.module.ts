import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedCommand } from './seed.command';

@Module({
  providers: [SeedService, SeedCommand],
  exports: [SeedService],
})
export class SeedModule {}