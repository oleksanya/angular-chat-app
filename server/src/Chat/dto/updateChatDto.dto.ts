import { IsArray, IsString, IsOptional } from 'class-validator';

export class UpdateChatDto {
  @IsOptional()
  @IsArray()
  participants?: string[];

  @IsOptional()
  @IsString()
  lastMessageContent?: string;

  @IsOptional()
  @IsString()
  lastSender?: string;

  @IsOptional()
  @IsString()
  content?: string;
}
