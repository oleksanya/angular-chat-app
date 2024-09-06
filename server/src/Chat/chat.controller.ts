import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @UseGuards(AuthGuard)
  @Get('/getAll/:userId')
  async getAllChats(@Param('userId') userId: string) {
    return this.chatService.getChatsByUserId(userId);
  }

  @Get('/getChat/:chatId') //should be finished 
  async getChatDetails(@Param('chatId') chatId: string) {
    return this.chatService.getChatById(chatId);
  }
}
