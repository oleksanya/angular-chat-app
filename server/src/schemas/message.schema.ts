import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';

export type MessageDocument = HydratedDocument<Message>;

@Schema({ timestamps: true })
export class Message {
  @Prop({ required: true })
  content: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  sender: Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true })
  chatId: Types.ObjectId;

  @Prop({ default: Date.now })
  timestamp: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
