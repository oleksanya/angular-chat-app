import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserCreds } from 'src/dto/user-creds.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(user: UserCreds): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = new this.userModel({
      username: user.username,
      email: user.email,
      password: hashedPassword,
    });
    return newUser.save();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async deleteUser(userId: string): Promise<User | null> {
    return this.userModel.findByIdAndDelete(userId).exec();
  }
}
