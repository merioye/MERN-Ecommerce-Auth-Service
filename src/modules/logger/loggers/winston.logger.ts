/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@nestjs/common';
import { Logger, createLogger, format, transports } from 'winston';
import { ILogger } from '../interfaces';
import { ENVIRONMENT } from '../../../constants';

@Injectable()
export class WinstonLogger implements ILogger {
  private static instance: WinstonLogger;
  private readonly logger: Logger;
  private readonly customFormat = {
    console: format.printf(({ timestamp, level, stack, message }) => {
      return `${timestamp} [${level}]: ${stack || message}`;
    }),
  };

  private constructor() {
    const isTestingEnvironment =
      (process.env.NODE_ENV as ENVIRONMENT) === ENVIRONMENT.TEST;

    this.logger = createLogger({
      level: 'info',
      defaultMeta: {
        application: 'ecommerce-auth-service',
      },
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.errors({ stack: true }),
        format.json(),
      ),
      transports: [
        new transports.Console({
          level: 'debug',
          silent: isTestingEnvironment,
          format: format.combine(
            format.colorize(),
            format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            format.errors({ stack: true }),
            this.customFormat.console,
          ),
        }),
        new transports.File({
          level: 'error',
          dirname: 'logs',
          filename: 'error.log',
          silent: isTestingEnvironment,
        }),
        new transports.File({
          level: 'debug',
          dirname: 'logs',
          filename: 'combined.log',
          silent: isTestingEnvironment,
        }),
      ],
    });
  }

  public static getInstance(): WinstonLogger {
    if (!WinstonLogger.instance) {
      WinstonLogger.instance = new WinstonLogger();
    }
    return WinstonLogger.instance;
  }

  private stringify(data: any): string {
    return typeof data === 'string' ? data : JSON.stringify(data);
  }

  public log(message: any, ...optionalParams: any[]): void {
    this.logger.log('info', this.stringify(message), optionalParams);
  }

  public info(message: any, ...optionalParams: any[]): void {
    this.logger.info(this.stringify(message), optionalParams);
  }

  public debug(message: any, ...optionalParams: any[]): void {
    this.logger.debug(this.stringify(message), optionalParams);
  }

  public verbose(message: any, ...optionalParams: any[]): void {
    this.logger.verbose(this.stringify(message), optionalParams);
  }

  public error(message: any, ...optionalParams: any[]): void {
    this.logger.error(this.stringify(message), optionalParams);
  }

  public warn(message: any, ...optionalParams: any[]): void {
    this.logger.warn(this.stringify(message), optionalParams);
  }
}
