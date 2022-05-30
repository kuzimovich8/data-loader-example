import * as dotenv from 'dotenv';
import { DotenvParseOutput } from 'dotenv';
import * as Joi from 'joi';
import * as fs from 'fs';
import { InternalServerErrorException } from '@nestjs/common';

export interface EnvConfig {
  PORT: number;
  DB_HOST: string;
  DB_PORT: number;
  DB_DATABASE: string;
  DB_USER: string;
  DB_PASS: string;
}

const envVarsSchema: Joi.ObjectSchema<EnvConfig> = Joi.object({
  PORT: Joi.number().positive().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().positive().required(),
  DB_DATABASE: Joi.string().required(),
  DB_USER: Joi.string().required(),
  DB_PASS: Joi.string().required(),
});

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor() {
    const config = dotenv.parse(fs.readFileSync('.env'));
    this.envConfig = ConfigService.validateInput(config);
  }

  get<K extends keyof EnvConfig>(key: K) {
    return this.envConfig[key];
  }

  private static validateInput(envConfig: DotenvParseOutput): EnvConfig {
    const { error, value: validatedEnvConfig } = envVarsSchema.validate(
      envConfig,
      { stripUnknown: true },
    );

    if (error) {
      throw new InternalServerErrorException(
        `Config validation error: ${error.message}`,
      );
    }

    return validatedEnvConfig;
  }
}
