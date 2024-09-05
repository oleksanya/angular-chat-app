import {
  IsArray,
  IsOptional,
  IsString,
  ValidateNested,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

class LastMessageDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  senderId: string;

  @IsOptional()
  timestamp: Date;
}

export class UpdateChatDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  participants?: string[];

  @IsOptional()
  @ValidateNested()
  @Type(() => LastMessageDto)
  lastMessage?: LastMessageDto;
}
