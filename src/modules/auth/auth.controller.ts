import { Controller, Inject, Post, Body, HttpStatus } from '@nestjs/common';
import { IAuthService } from './interfaces';
import { AuthServiceToken } from './constants';
import { RegisterUserDto } from './dtos';
import { ILogger, LoggerToken } from '../logger';
import { ApiResponse } from '../../utils';

@Controller()
export class AuthController {
  public constructor(
    @Inject(LoggerToken) private readonly logger: ILogger,
    @Inject(AuthServiceToken) private readonly authService: IAuthService,
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
    this.logger.info('User has been registered', { id });

    return new ApiResponse({
      result: { id },
      message: 'User registered successfully',
      statusCode: HttpStatus.CREATED,
    });
  }
}
