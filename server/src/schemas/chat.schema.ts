import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { User } from './user.schema';

export type ChatDocument = HydratedDocument<Chat>;

@Schema({
  timestamps: true,
})
export class Chat {
  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], required: true })
  participants: Types.ObjectId[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }] })
  messages: Types.ObjectId[];

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: true,
  })
  lastSender: User;
  @Prop({
    type: Object,
    default: null,
  })
  lastMessage: {
    content: string;
    timestamp: Date;
  };
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
