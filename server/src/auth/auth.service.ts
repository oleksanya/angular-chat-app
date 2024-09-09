import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(user: any): Promise<{ access_token: string }> {
    const existUser = await this.userService.findByEmail(user.email);

    if (!existUser) {
      throw new BadRequestException('User with such email is not found');
    }

    const validateUser = await bcrypt.compare(
      user.password,
      existUser.password,
    );

    if (!validateUser) {
      throw new UnauthorizedException();
    }

    const payload = { email: existUser.email, sub: existUser._id };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
