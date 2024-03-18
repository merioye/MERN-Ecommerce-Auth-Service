import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthServiceToken } from './constants';
import { AuthService } from './auth.service';
import { UsersModule } from '../users';
import { HashModule } from '../hash';

@Module({
  imports: [UsersModule, HashModule],
  controllers: [AuthController],
  providers: [{ provide: AuthServiceToken, useClass: AuthService }],
})
export class AuthModule {}
