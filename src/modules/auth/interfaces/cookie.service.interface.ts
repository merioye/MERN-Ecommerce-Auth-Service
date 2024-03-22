import { AuthTokenCookieParams } from '../types';

export interface ICookieService {
  attachAuthTokenCookie(params: AuthTokenCookieParams): void;
}
