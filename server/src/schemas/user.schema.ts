import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  _id: mongoose.Types.ObjectId;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ type: String, default: '' })
  profileImage: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Chat' }] })
  chats: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  friends: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
