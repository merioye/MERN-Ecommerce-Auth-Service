import {
  ConfigModule,
  ConfigModuleOptions,
  ConfigService,
} from '@nestjs/config';
import { ValidationPipeOptions } from '@nestjs/common';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import Joi from 'joi';
import { join } from 'path';
import {
  AUTH_TOKEN_ALGORITHM,
  CONFIG,
  ENVIRONMENT,
  HASHING_ALGORITHM,
} from '../constants';
import { ErrorFormat } from '../types';
import { RequestValidationError } from '../errors';

const { DEV, TEST, PROD } = ENVIRONMENT;
const { SHA256, SHA384, SHA512 } = HASHING_ALGORITHM;
const { HS256, HS512, RS256, RS512 } = AUTH_TOKEN_ALGORITHM;

const configOptions: ConfigModuleOptions = {
  isGlobal: true,
  envFilePath: join(__dirname, `../../.env.${process.env.NODE_ENV}`),
  validationSchema: Joi.object({
    PORT: Joi.number().default(5000),
    NODE_ENV: Joi.string().valid(DEV, TEST, PROD).required(),
    API_PREFIX: Joi.string().required(),
    API_DEFAULT_VERSION: Joi.string().required(),
    DB_NAME: Joi.string().required(),
    DB_URI: Joi.string().required(),
    HASHING_ALGORITHM: Joi.string().valid(SHA256, SHA384, SHA512).required(),
    ACCESS_TOKEN_SECRET: Joi.string().required(),
    REFRESH_TOKEN_SECRET: Joi.string().required(),
    ACCESS_TOKEN_ALGORITHM: Joi.string()
      .valid(RS256, RS512, HS256, HS512)
      .required(),
    REFRESH_TOKEN_ALGORITHM: Joi.string()
      .valid(RS256, RS512, HS256, HS512)
      .required(),
    ACCESS_TOKEN_EXPIRY: Joi.number().required(),
    REFRESH_TOKEN_EXPIRY: Joi.number().required(),
    JWT_TOKEN_ISSUER: Joi.string().required(),
  }),
  validationOptions: {
    abortEarly: true,
  },
};

const validationPipeOptions: ValidationPipeOptions = {
  whitelist: true,
  exceptionFactory: (errors) => {
    const formatedErrors = errors?.map((error): ErrorFormat => {
      return {
        message: error.constraints[Object.keys(error.constraints)[0]],
        field: error.property,
        location: 'body',
        stack: null,
      };
    });
    throw new RequestValidationError(formatedErrors);
  },
};

const dataSourceOptions: PostgresConnectionOptions = {
  type: 'postgres',
  entities: [join(__dirname, '../', '**/', '*.entity.{ts,js}')],
  migrations: [join(__dirname, '../', 'migrations', '*.{ts,js}')],
  subscribers: [],
  synchronize: false,
  logging: false,
};

const typeOrmModuleOptions: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    ...dataSourceOptions,
    url: configService.get<string>(CONFIG.DB_URI),
    database: configService.get<string>(CONFIG.DB_NAME),
  }),
  inject: [ConfigService],
};

export {
  configOptions,
  validationPipeOptions,
  typeOrmModuleOptions,
  dataSourceOptions,
};
