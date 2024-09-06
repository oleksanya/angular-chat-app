import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from 'src/schemas/message.schema';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { Chat, ChatSchema } from 'src/schemas/chat.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Message.name, schema: MessageSchema },
      { name: Chat.name, schema: ChatSchema },
    ]),
  ],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
