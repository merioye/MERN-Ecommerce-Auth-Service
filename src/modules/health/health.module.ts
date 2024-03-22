import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { HealthService } from './services';
import { HealthServiceToken } from './constants';

@Module({
  controllers: [HealthController],
  providers: [{ provide: HealthServiceToken, useClass: HealthService }],
})
export class HealthModule {}
