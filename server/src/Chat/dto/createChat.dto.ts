import { IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateChatDto {
  @IsString()
  participant1: Types.ObjectId;

  @IsString()
  participant2: Types.ObjectId;
}
