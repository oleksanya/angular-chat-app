import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat } from 'src/schemas/chat.schema';
import { Message } from '../schemas/message.schema';
import { CreateMessageDto } from './dto/createMessage.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
    @InjectModel(Chat.name) private chatModel: Model<Chat>,
  ) {}

  async createMessage(createMessageDto: CreateMessageDto): Promise<Message> {
    const newMessage = new this.messageModel(createMessageDto);
    const savedMessage = await newMessage.save();

    await this.chatModel.findByIdAndUpdate(createMessageDto.chatId, {
      lastMessage: {
        content: createMessageDto.content,
        senderId: createMessageDto.senderId,
      },
    });
    return savedMessage;
  }
  async getMessageById(messageId: string): Promise<Message> {
    return this.messageModel.findById(messageId).exec();
  }

  async updateMessage(
    messageId: string,
    updateMessageDto: CreateMessageDto,
  ): Promise<Message> {
    return this.messageModel
      .findByIdAndUpdate(messageId, updateMessageDto, { new: true })
      .exec();
  }
}
