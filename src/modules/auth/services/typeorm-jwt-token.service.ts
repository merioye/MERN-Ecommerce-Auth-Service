import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Algorithm } from 'jsonwebtoken';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  AccessTokenPayload,
  RefreshToken,
  RefreshTokenPayload,
} from '../types';
import { CONFIG } from '../../../constants';
import { ITokenService } from '../interfaces';
import { User } from '../../users';
import { RefreshTokensEntity } from '../entities/refresh-token.entity';

@Injectable()
export class TypeOrmJwtTokenService implements ITokenService {
  private readonly accessSecret: string;
  private readonly refreshSecret: string;
  private readonly accessAlgorithm: Algorithm;
  private readonly refreshAlgorithm: Algorithm;
  private readonly accessExpiry: number;
  private readonly refreshExpiry: number;
  private readonly jwtTokenIssuer: string;

  public constructor(
    @InjectRepository(RefreshTokensEntity)
    private readonly refreshTokensRepo: Repository<RefreshTokensEntity>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.accessSecret = this.configService.get<string>(
      CONFIG.ACCESS_TOKEN_SECRET,
    );
    this.refreshSecret = this.configService.get<string>(
      CONFIG.REFRESH_TOKEN_SECRET,
    );
    this.accessAlgorithm = this.configService.get<Algorithm>(
      CONFIG.ACCESS_TOKEN_ALGORITHM,
    );
    this.refreshAlgorithm = this.configService.get<Algorithm>(
      CONFIG.REFRESH_TOKEN_ALGORITHM,
    );
    this.accessExpiry = this.configService.get<number>(
      CONFIG.ACCESS_TOKEN_EXPIRY,
    );
    this.refreshExpiry = this.configService.get<number>(
      CONFIG.REFRESH_TOKEN_EXPIRY,
    );
    this.jwtTokenIssuer = this.configService.get<string>(
      CONFIG.JWT_TOKEN_ISSUER,
    );
  }

  public generateAccessToken(payload: AccessTokenPayload): string {
    return this.jwtService.sign(payload, {
      secret: this.accessSecret,
      algorithm: this.accessAlgorithm,
      expiresIn: String(this.accessExpiry),
      issuer: this.jwtTokenIssuer,
    });
  }

  public generateRefreshToken(payload: RefreshTokenPayload): string {
    return this.jwtService.sign(payload, {
      secret: this.refreshSecret,
      algorithm: this.refreshAlgorithm,
      expiresIn: String(this.refreshExpiry),
      issuer: this.jwtTokenIssuer,
      jwtid: payload.jwtId,
    });
  }

  public async saveRefreshToken(user: User): Promise<RefreshToken> {
    const refreshToken = this.refreshTokensRepo.create({
      user,
      expiresAt: new Date(Date.now() + this.refreshExpiry),
    });
    return this.refreshTokensRepo.save(refreshToken);
  }
}
