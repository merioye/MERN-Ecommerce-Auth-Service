import { Inject, Injectable } from '@nestjs/common';
import { IAuthService } from './interfaces';
import { IUsersService, User, UsersServiceToken } from '../users';
import { RegisterUserDto } from './dtos';
import { ConflictError } from '../../errors';
import { HashServiceToken, IHashService } from '../hash';

@Injectable()
export class AuthService implements IAuthService {
  public constructor(
    @Inject(HashServiceToken) private readonly hashService: IHashService,
    @Inject(UsersServiceToken) private readonly usersService: IUsersService,
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
}
