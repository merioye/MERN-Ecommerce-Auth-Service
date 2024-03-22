import { Response } from 'express';
import { CONFIG, ROLE } from '../../../constants';
import { User } from '../../users';

type AccessTokenPayload = {
  sub: string;
  role: ROLE;
};

type RefreshTokenPayload = {
  jwtId: string;
} & AccessTokenPayload;

type RefreshToken = {
  id: string;
  expiresAt: Date;
  userId: string;
  user?: User;
  createdAt: Date;
  updatedAt: Date;
};

type UserAuthTokens = {
  user: User;
  accessToken: string;
  refreshToken: string;
};

type AuthTokenCookieParams = {
  res: Response;
  name: string;
  value: string;
  expiryConfigName: CONFIG.ACCESS_TOKEN_EXPIRY | CONFIG.REFRESH_TOKEN_EXPIRY;
};

export {
  AccessTokenPayload,
  RefreshTokenPayload,
  RefreshToken,
  UserAuthTokens,
  AuthTokenCookieParams,
};
