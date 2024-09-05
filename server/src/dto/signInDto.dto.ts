import { IsEmail, IsString } from 'class-validator';

export class SignIn {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
