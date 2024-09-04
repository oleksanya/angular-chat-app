import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Message extends Document {
  @Prop({ type: String, ref: 'Chat' })
  chatId: string;

  @Prop({ type: String, ref: 'User' })
  senderId: string;

  @Prop({ type: String })
  content: string;

  @Prop({ type: [String], default: [] })
  readBy: string[];
}

export const MessageSchema = SchemaFactory.createForClass(Message);
