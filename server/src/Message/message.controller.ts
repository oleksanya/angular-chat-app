import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/createMessage.dto';

@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Post('create')
  async createMessage(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.createMessage(createMessageDto);
  }

  @Get(':id')
  async getMessage(@Param('id') id: string) {
    return this.messageService.getMessageById(id);
  }

  @Post(':id')
  async updateMessage(
    @Param('id') id: string,
    @Body() updateMessageDto: CreateMessageDto,
  ) {
    return this.messageService.updateMessage(id, updateMessageDto);
  }
}
