import { IsString, IsOptional, IsEmail, IsArray } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  profileImage?: string;

  @IsOptional()
  @IsArray()
  chats?: string[];

  @IsOptional()
  @IsArray()
  friends?: string[];
}
