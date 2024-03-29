import { Module, Global } from '@nestjs/common';
import { LoggerToken } from './constants';
import { WinstonLogger } from './loggers';

@Global()
@Module({
  providers: [{ provide: LoggerToken, useValue: WinstonLogger.getInstance() }],
  exports: [{ provide: LoggerToken, useValue: WinstonLogger.getInstance() }],
})
export class LoggerModule {}
