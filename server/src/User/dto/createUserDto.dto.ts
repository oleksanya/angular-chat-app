import { IsString, IsEmail, IsOptional, IsArray } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  profileImage?: string;

  @IsOptional()
  @IsArray()
  chats?: string[]; // Array of Chat IDs (as strings)

  @IsOptional()
  @IsArray()
  friends?: string[]; // Array of User IDs (as strings)
}
