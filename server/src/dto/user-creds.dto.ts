import { IsEmail, IsString } from 'class-validator';

export class UserCreds {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
