import { IsArray, IsString, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class CreateChatDto {
  @IsArray()
  @IsNotEmpty()
  participants: Types.ObjectId[];
  @IsString()
  @IsNotEmpty()
  lastMessageContent: string;

  @IsString()
  @IsNotEmpty()
  lastSender: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
