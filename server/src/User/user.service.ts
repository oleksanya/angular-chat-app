import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/createUserDto.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(user: CreateUserDto): Promise<User> {
    const { username, email, password } = user;

    const existingUser = await this.findByEmail(email);

    if (existingUser) {
      throw new BadRequestException('Email is already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({
      username: username,
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
