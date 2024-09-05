import { IsArray, ArrayNotEmpty } from 'class-validator';

export class CreateChatDto {
  @IsArray()
  @ArrayNotEmpty()
  participants: string[];
}
