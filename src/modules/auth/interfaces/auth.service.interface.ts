import { User } from '../../users';
import { RegisterUserDto } from '../dtos';

export interface IAuthService {
  register(data: RegisterUserDto): Promise<User>;
}
