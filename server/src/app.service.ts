import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  findAll(): string {
    return 'This action returns all cats';
  }
}
