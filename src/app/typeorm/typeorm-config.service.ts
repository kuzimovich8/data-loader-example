import { Inject, Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import baseConfig from './typeorm-base.config';
import { ConfigService } from '@app/config/config.service';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(
    @Inject(ConfigService)
    private readonly configService: ConfigService,
  ) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const host = this.configService.get('DB_HOST');
    const port = this.configService.get('DB_PORT');
    const username = this.configService.get('DB_USER');
    const password = this.configService.get('DB_PASS');
    const database = this.configService.get('DB_DATABASE');

    return {
      ...baseConfig,
      host,
      port,
      username,
      password,
      database,
    };
  }
}
