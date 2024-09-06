import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ChatModule } from './Chat/chat.module';
import { MessageModule } from './Message/message.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://oleksanya:3BV5lFjf14M7JXu7@cluster0.bckvy.mongodb.net/chat',
    ),
    UserModule,
    AuthModule,
    ChatModule,
    MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
