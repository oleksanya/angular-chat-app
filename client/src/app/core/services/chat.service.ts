import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { constants } from '../constants';
import { Observable } from 'rxjs';
import io, { Socket } from 'socket.io-client';
import {
  User,
  NewMessageEvent,
  MessagesResponse,
  Chat,
} from '../../interfaces/chat.interface';

export interface NewMessage {
  content: string;
  senderId: string;
  chatId: string;
}

interface JwtPayload {
  sub: string;
  [key: string]: unknown;
}

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private socket: Socket;

  constructor(private http: HttpClient) {
    this.socket = io(constants.API_URL, {
      autoConnect: false,
      transports: ['websocket', 'polling'],
      timeout: 5000,
      forceNew: true,
    });

    this.socket.on('connect_error', () => {
      // Socket connection error handled
    });

    this.socket.on('disconnect', () => {
      // Socket disconnected handled
    });
  }

  getUserId(): string {
    const userToken = localStorage.getItem('user_token');

    if (!userToken) {
      throw new Error('No user token found');
    }

    const decodedToken = jwtDecode<JwtPayload>(userToken);
    return decodedToken.sub;
  }

  getChatsData(): Observable<Chat[]> {
    const userId = this.getUserId();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    });

    return this.http.get<Chat[]>(
      `${constants.API_URL}/chats/getAll/${userId}`,
      { headers }
    );
  }

  getSendersProfileImg(senderId: string): Observable<User> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    });

    return this.http.get<User>(`${constants.API_URL}/user/${senderId}`, {
      headers,
    });
  }

  getAllMessages(chatId: string): Observable<MessagesResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    });

    return this.http.get<MessagesResponse>(
      `${constants.API_URL}/chats/getChat/${chatId}`,
      { headers }
    );
  }

  connectSocket(): void {
    if (!this.socket.connected) {
      this.socket.connect();
    }
  }

  sendMessage(messageData: NewMessage): void {
    if (!messageData.content.trim()) {
      return;
    }

    this.connectSocket();

    this.socket.emit('message', {
      chatId: messageData.chatId,
      content: messageData,
    });
  }

  getMessages(chatId?: string): Observable<NewMessageEvent> {
    this.connectSocket();

    return new Observable<NewMessageEvent>((observer) => {
      this.socket.on('message', (data: NewMessageEvent) => {
        if (chatId && data.chatId === chatId) {
          observer.next(data);
        } else if (!chatId) {
          observer.next(data);
        }
      });

      return () => {
        this.socket.off('message');
      };
    });
  }

  disconnectFromSocket(): void {
    this.socket.disconnect();
  }

  joinChat(chatId: string): void {
    this.connectSocket();
    this.socket.emit('joinChat', chatId);
  }

  deleteChat(chatId: string): Observable<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    });

    return this.http.delete<void>(
      `${constants.API_URL}/chats/deleteChat/${chatId}`,
      { headers }
    );
  }
}
