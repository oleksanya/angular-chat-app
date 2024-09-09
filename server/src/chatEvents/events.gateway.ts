import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateMessageDto } from 'src/Message/dto/createMessage.dto';
import { MessageService } from 'src/Message/message.service';

@WebSocketGateway({ cors: true })
export class EventsGateway implements OnGatewayInit, OnGatewayConnection {
  constructor(private messageService: MessageService) {}
  @WebSocketServer()
  server: Server;

  handleConnection() {
    console.log('Connection handled');
  }

  afterInit() {
    console.log('Ws connected');
  }

  @SubscribeMessage('joinChat')
  handleJoinChat(
    @MessageBody() chatId: string,
    @ConnectedSocket() client: Socket,
  ) {
    console.log('new participant has joined the room with id: ', chatId);
    client.join(chatId);
  }

  @SubscribeMessage('message')
  async handleRoomMessage(
    @MessageBody() message: { chatId: string; content: CreateMessageDto },
    // @ConnectedSocket() client: Socket,
  ) {
    const newMessage = await this.messageService.createMessage(message.content);
    // Broadcast the message to the room (chatId)
    this.server
      .to(message.chatId)
      .emit('message', { newMessage, chatId: message.chatId });
  }
}
