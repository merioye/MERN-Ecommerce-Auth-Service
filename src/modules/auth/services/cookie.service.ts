import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CONFIG, ENVIRONMENT } from '../../../constants';
import { ICookieService } from '../interfaces';
import { AuthTokenCookieParams } from '../types';

@Injectable()
export class CookieService implements ICookieService {
  public constructor(private readonly configService: ConfigService) {}

  public attachAuthTokenCookie({
    res,
    name,
    value,
    expiryConfigName,
  }: AuthTokenCookieParams): void {
    res.cookie(name, value, {
      expires: new Date(
        Date.now() + this.configService.get<number>(expiryConfigName),
      ),
      sameSite:
        this.configService.get<ENVIRONMENT>(CONFIG.NODE_ENV) ===
        ENVIRONMENT.PROD
          ? 'none'
          : 'lax',
      secure:
        this.configService.get<ENVIRONMENT>(CONFIG.NODE_ENV) ===
        ENVIRONMENT.PROD,
      httpOnly: true,
    });
  }
}
