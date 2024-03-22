import { Inject, Injectable } from '@nestjs/common';
import { IAuthService, ITokenService } from '../interfaces';
import { IUsersService, User, UsersServiceToken } from '../../users';
import { LoginUserDto, RegisterUserDto } from '../dtos';
import {
  BadRequestError,
  ConflictError,
  ForbiddenError,
} from '../../../errors';
import { HashServiceToken, IHashService } from '../../hash';
import { TokenServiceToken } from '../constants';
import { UserAuthTokens } from '../types';
import { ILogger, LoggerToken } from '../../logger';

@Injectable()
export class AuthService implements IAuthService {
  public constructor(
    @Inject(LoggerToken) private readonly logger: ILogger,
    @Inject(HashServiceToken) private readonly hashService: IHashService,
    @Inject(UsersServiceToken) private readonly usersService: IUsersService,
    @Inject(TokenServiceToken) private readonly tokenService: ITokenService,
  ) {}

  public async register(data: RegisterUserDto): Promise<User> {
    const { email, password } = data;
    const user = await this.usersService.findOneBy({ email });
    if (user) {
      throw new ConflictError('User already exists');
    }

    const hashedPassword = await this.hashService.hash(password);
    return await this.usersService.create({
      ...data,
      password: hashedPassword,
    });
  }

  public async login(data: LoginUserDto): Promise<UserAuthTokens> {
    const { email, password } = data;
    const user = await this.usersService.findOneBy({ email });
    if (!user) {
      throw new BadRequestError('Invalid credentials');
    }
    if (!user.isActivated) {
      throw new ForbiddenError('User account is not activated');
    }

    const isMatched = await this.hashService.compare(password, user.password);
    if (!isMatched) {
      throw new BadRequestError('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      role: user.role,
    };
    const newRefreshToken = await this.tokenService.saveRefreshToken(user);
    const accessToken = this.tokenService.generateAccessToken(payload);
    const refreshToken = this.tokenService.generateRefreshToken({
      ...payload,
      jwtId: newRefreshToken.id,
    });

    this.logger.info('Auth tokens have been generated', { userId: user.id });

    return { user, accessToken, refreshToken };
  }
}
