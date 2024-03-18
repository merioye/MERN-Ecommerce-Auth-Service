import { Module, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  configOptions,
  typeOrmModuleOptions,
  validationPipeOptions,
} from './config';
import {
  GracefulShutdownModule,
  HealthModule,
  LoggerModule,
  AuthModule,
  UsersModule,
  HashModule,
} from './modules';
import { AllExceptionsFilter } from './filters';

@Module({
  imports: [
    ConfigModule.forRoot(configOptions),
    TypeOrmModule.forRootAsync(typeOrmModuleOptions),
    LoggerModule,
    GracefulShutdownModule,
    HealthModule,
    AuthModule,
    UsersModule,
    HashModule,
  ],
  providers: [
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe(validationPipeOptions),
    },
  ],
})
export class AppModule {}
