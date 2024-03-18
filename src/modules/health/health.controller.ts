import { Controller, Get, Inject } from '@nestjs/common';
import { IHealthService } from './interfaces';
import { HealthServiceToken } from './constants';
import { Health } from './types';
import { LoggerToken, ILogger } from '../logger';

@Controller()
export class HealthController {
  public constructor(
    @Inject(LoggerToken) private readonly logger: ILogger,
    @Inject(HealthServiceToken) private readonly healthService: IHealthService,
  ) {}

  @Get('/healthcheck')
  public checkHealth(): Health {
    this.logger.info('Request for checking server health');
    return this.healthService.health();
  }
}
