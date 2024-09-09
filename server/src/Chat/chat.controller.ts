import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateChatDto } from './dto/createChat.dto';

@UseGuards(AuthGuard)
@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('/getAll/:userId')
  async getAllChats(@Param('userId') userId: string) {
    return this.chatService.getChatsByUserId(userId);
  }

  @Get('/getChat/:chatId')
  async getChatDetails(@Param('chatId') chatId: string) {
    return this.chatService.getChatById(chatId);
  }

  @Get('/lastMessage/:chatId')
  async getLastMessage(@Param('chatId') chatId: string) {
    return this.chatService.getLastChatMessage(chatId);
  }

  @Post('/createChat/')
  async createChat(@Body() createChatDto: CreateChatDto) {
    const { participant1, participant2 } = createChatDto;

    const newChat = await this.chatService.createChat(
      participant1,
      participant2,
    );

    return newChat;
  }

  @Delete('/deleteChat/:chatId')
  async deleteChat(@Param('chatId') chatId: string): Promise<void> {
    await this.chatService.deleteChat(chatId);
  }
}
