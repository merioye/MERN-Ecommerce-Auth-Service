import { User } from '../../users';
import { LoginUserDto, RegisterUserDto } from '../dtos';
import { UserAuthTokens } from '../types';

export interface IAuthService {
  register(data: RegisterUserDto): Promise<User>;
  login(data: LoginUserDto): Promise<UserAuthTokens>;
}
