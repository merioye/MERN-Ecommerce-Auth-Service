import { User } from '../../users';
import {
  AccessTokenPayload,
  RefreshToken,
  RefreshTokenPayload,
} from '../types';

export interface ITokenService {
  generateAccessToken(payload: AccessTokenPayload): string;
  generateRefreshToken(payload: RefreshTokenPayload): string;
  saveRefreshToken(user: User): Promise<RefreshToken>;
}
