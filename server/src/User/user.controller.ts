import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreds } from 'src/dto/user-creds.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-up')
  async signUp(@Body() body: UserCreds) {
    const userExist = await this.userService.findByEmail(body.email);

    if (userExist !== null) {
      throw new HttpException('User already exist', HttpStatus.CONFLICT);
    }
    const user = await this.userService.createUser(body);
    return { message: 'User registered successfully', user };
  }

  @Get()
  async getUserByEmail(@Query('email') email: string) {
    const user = await this.userService.findByEmail(email);
    if (user === null) {
      throw new HttpException('User not found', HttpStatus.CONFLICT);
    }
    return user;
  }

  @Get('/:userId')
  async getUserById(@Param('userId') userId: string) {
    const user = await this.userService.findById(userId);

    if (user === null) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  @Post('/:userId')
  async deleteUserById(@Param('userId') userId: string) {
    const user = await this.userService.findById(userId);

    if (user === null) {
      throw new NotFoundException('User not found');
    }

    const deletedUser = await this.userService.deleteUser(userId);
    return { message: 'User deleted successfully', deletedUser };
  }
}
