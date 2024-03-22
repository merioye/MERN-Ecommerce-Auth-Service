import { IsEmail, MinLength, IsString } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(1)
  password: string;
}
