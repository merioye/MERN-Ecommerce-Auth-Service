import {
  Controller,
  Inject,
  Post,
  Body,
  HttpStatus,
  Res,
  HttpCode,
} from '@nestjs/common';
import { Response } from 'express';
import { IAuthService, ICookieService } from './interfaces';
import { AuthServiceToken, CookieServiceToken } from './constants';
import { LoginUserDto, RegisterUserDto } from './dtos';
import { ILogger, LoggerToken } from '../logger';
import { ApiResponse } from '../../utils';
import { CONFIG } from '../../constants';

@Controller()
export class AuthController {
  public constructor(
    @Inject(LoggerToken) private readonly logger: ILogger,
    @Inject(AuthServiceToken) private readonly authService: IAuthService,
    @Inject(CookieServiceToken) private readonly cookieService: ICookieService,
  ) {}

  @Post('/register')
  public async registerUser(
    @Body() body: RegisterUserDto,
  ): Promise<ApiResponse> {
    const { firstName, lastName, email } = body;
    this.logger.debug('Request to register a new user', {
      firstName,
      lastName,
      email,
      password: '******',
    });

    const { id } = await this.authService.register(body);
    this.logger.info('User has been registered', { userId: id });

    return new ApiResponse({
      result: { id },
      message: 'User registered successfully',
      statusCode: HttpStatus.CREATED,
    });
  }

  @Post('login')
  @HttpCode(200)
  public async loginUser(
    @Body() body: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ApiResponse> {
    const { email } = body;
    this.logger.debug('Request to login the user', {
      email,
      password: '******',
    });

    const {
      user: { id },
      accessToken,
      refreshToken,
    } = await this.authService.login(body);

    this.cookieService.attachAuthTokenCookie({
      res,
      name: 'accessToken',
      value: accessToken,
      expiryConfigName: CONFIG.ACCESS_TOKEN_EXPIRY,
    });
    this.cookieService.attachAuthTokenCookie({
      res,
      name: 'refreshToken',
      value: refreshToken,
      expiryConfigName: CONFIG.REFRESH_TOKEN_EXPIRY,
    });

    this.logger.info('User has been logged in', { userId: id });

    return new ApiResponse({
      result: { accessToken, refreshToken },
      message: 'User logged in successfully',
      statusCode: HttpStatus.OK,
    });
  }
}
