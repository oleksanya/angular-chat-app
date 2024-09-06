import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { AuthGuard } from 'src/auth/auth.guard';

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
}
