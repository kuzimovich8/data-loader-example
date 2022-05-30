import baseConfig from './typeorm-base.config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@app/config/config.service';

const configService = new ConfigService();

const host = configService.get('DB_HOST');
const port = configService.get('DB_PORT');
const username = configService.get('DB_USER');
const password = configService.get('DB_PASS');
const database = configService.get('DB_DATABASE');

const config: TypeOrmModuleOptions = {
  ...baseConfig,
  host,
  port,
  username,
  password,
  database,
};

export = config;
