import { Command } from 'nestjs-command';
import { Inject, Injectable } from '@nestjs/common';
import { SeedService } from './seed.service';

@Injectable()
export class SeedCommand {
  constructor(
    @Inject(SeedService)
    private readonly seedService: SeedService,
  ) {}

  @Command({ command: 'db:seed' })
  async seed() {
    await this.seedService.seedDb();
  }

  @Command({ command: 'db:prune' })
  async prune() {
    await this.seedService.pruneDb();
  }
}
