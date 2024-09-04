import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Chat extends Document {
  @Prop({ type: [{ type: String, ref: 'User' }] })
  participants: string[];

  @Prop({ type: Object })
  lastMessage: {
    content: string;
    senderId: string;
    timestamp: Date;
  };
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
