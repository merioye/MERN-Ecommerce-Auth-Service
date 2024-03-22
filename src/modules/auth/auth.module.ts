import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import {
  AuthServiceToken,
  CookieServiceToken,
  TokenServiceToken,
} from './constants';
import { UsersModule } from '../users';
import { HashModule } from '../hash';
import { AuthService, TypeOrmJwtTokenService, CookieService } from './services';
import { RefreshTokensEntity } from './entities';

@Module({
  imports: [
    UsersModule,
    HashModule,
    JwtModule.register({}),
    TypeOrmModule.forFeature([RefreshTokensEntity]),
  ],
  controllers: [AuthController],
  providers: [
    { provide: AuthServiceToken, useClass: AuthService },
    { provide: TokenServiceToken, useClass: TypeOrmJwtTokenService },
    { provide: CookieServiceToken, useClass: CookieService },
  ],
})
export class AuthModule {}
