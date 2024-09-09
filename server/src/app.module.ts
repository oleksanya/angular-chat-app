import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ChatModule } from './Chat/chat.module';
import { MessageModule } from './Message/message.module';
import { ConfigModule } from '@nestjs/config';
import { EventsModule } from './chatEvents/events.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Load environment variables
    MongooseModule.forRoot(process.env.DATABASE_URI),
    UserModule,
    AuthModule,
    ChatModule,
    MessageModule,
    EventsModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
