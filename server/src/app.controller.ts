import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from './auth/auth.guard';

@Controller('/api')
export class AppController {
  constructor() {}

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
