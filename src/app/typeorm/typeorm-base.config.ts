import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const baseConfig: PostgresConnectionOptions = {
  type: 'postgres',
  entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
  subscribers: [`${__dirname}/../**/*.subscriber{.ts,.js}`],
  synchronize: false,
  migrationsRun: false,
  migrations: [`${__dirname}/../../migrations/*{.ts,.js}`],
  cli: {
    migrationsDir: 'src/migrations',
  },
  logger: 'file',
  logging: true,
  // cache: true,
  // cache: {
  //   type: 'redis',
  //   options: {
  //     host: 'localhost',
  //     port: 6379,
  //   },
  //   ignoreErrors: true
  // },
};

export default baseConfig;
