import { IsString, IsNotEmpty, IsMongoId } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  sender: string;

  @IsMongoId()
  @IsNotEmpty()
  chatId: string;
}
