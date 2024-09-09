import { Injectable } from '@nestjs/common';
import { Chat } from '../schemas/chat.schema';
import { Model, Types } from 'mongoose';

import { InjectModel } from '@nestjs/mongoose';

import { Message } from 'src/schemas/message.schema';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name) private chatModel: Model<Chat>,
    @InjectModel(Message.name) private messageModel: Model<Message>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async createChat(participant1: any, participant2: any): Promise<Chat> {
    // Ensure participants are not the same
    if (participant1 === participant2) {
      throw new Error('Cannot create a chat with the same user.');
    }

    // Check if a chat already exists between these two participants
    const existingChat = await this.chatModel.findOne({
      participants: {
        $all: [
          new Types.ObjectId(participant1),
          new Types.ObjectId(participant2),
        ],
      },
    });
    if (existingChat) {
      throw new Error('A chat between these users already exists.');
    }

    const newChat = new this.chatModel({
      participants: [
        new Types.ObjectId(participant1),
        new Types.ObjectId(participant2),
      ],
      messages: [],
      lastSender: participant2,
    });
    const savedChat = await newChat.save();

    await this.userModel.updateOne(
      { _id: participant1 },
      { $push: { chats: savedChat._id } },
    );
    await this.userModel.updateOne(
      { _id: participant2 },
      { $push: { chats: savedChat._id } },
    );

    return savedChat;
  }

  async findChatsByIds(chatIds: Types.ObjectId[]): Promise<Chat[]> {
    return this.chatModel.find({ _id: { $in: chatIds } }).exec();
  }

  async getChatsByUserId(userId: string): Promise<Chat[]> {
    return await this.chatModel
      .find({
        participants: new Types.ObjectId(userId),
      })
      .exec();
  }

  async getChatById(chatId: string): Promise<Chat> {
    return this.chatModel
      .findById(chatId)
      .populate({
        path: 'messages',
        model: 'Message',
      })
      .populate({
        path: 'participants',
        model: 'User',
        select: '-password -email -friends -chats', //exclude sensitive userdata
      })
      .exec();
  }

  async getLastChatMessage(chatId: string): Promise<Message> {
    return this.chatModel.findOne({ _id: chatId }, 'lastMessage');
  }

  async deleteChat(chatId: string): Promise<void> {
    await this.userModel.updateMany(
      { chats: chatId },
      { $pull: { chats: chatId } },
    );

    const chat = await this.chatModel
      .findOne({ _id: chatId })
      .select('messages')
      .exec();

    if (!chat) {
      throw new Error('Chat not found');
    }

    const messageIds = chat.messages;

    if (messageIds.length > 0) {
      await this.messageModel.deleteMany({ _id: { $in: messageIds } });
    }

    await this.chatModel.deleteOne({ _id: chatId });
  }
}
