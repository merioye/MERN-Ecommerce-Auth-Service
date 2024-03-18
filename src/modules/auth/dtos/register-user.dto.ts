import {
  IsEmail,
  IsString,
  IsStrongPassword,
  MinLength,
  MaxLength,
} from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  firstName: string;

  @IsString()
  @MinLength(1)
  @MaxLength(20)
  lastName: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
