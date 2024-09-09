import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { constants } from '../constants';
import { Observable } from 'rxjs';
import io from 'socket.io-client';

export interface NewMessage {
  content: string;
  senderId: string;
  chatId: string;
}
@Injectable()
export class ChatService {
  private socket = io(constants.API_URL);

  constructor(private http: HttpClient) {
    
  }

  getUserId(): string {
    const user_token = localStorage.getItem('user_token');

    if (!user_token) {
      throw new Error('No user token found');
    }

    const decodedToken = jwtDecode(user_token);

    return decodedToken.sub as string;
  }

  getChatsData(): Observable<any> { 
    const userId = this.getUserId();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.http.get(`${constants.API_URL}/chats/getAll/${userId}`, { headers });
  }

  getSendersProfileImg(senderId: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.http.get(`${constants.API_URL}/user/${senderId}`, { headers })
  }

  getAllMessages(chatId: string): Observable<any> { 
    let headers = new HttpHeaders();

    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.http.get(`${constants.API_URL}/chats/getChat/${chatId}`, { headers });
  }

  sendMessage(messageData: NewMessage) {
    if (messageData.content === '') {
      return;
    }

    this.socket.emit(
      'message', 
      { 
        chatId: messageData.chatId, 
        content: messageData 
      }
    );
  }

  getMessages(chatId?: string) {
    let observable = new Observable<any>(observer => {
      this.socket.on('message', (data) => {
        if (chatId && data.chatId === chatId) {
          observer.next(data);
        } else if (!chatId) {
          observer.next(data);
        }
      }); 
    });
    return observable;
  }

  disconnectFromSocket() {
    this.socket.disconnect();
  }

  joinChat(chatId: string) {
    this.socket.emit('joinChat', chatId);
  }

  deleteChat(chatId: string): Observable<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    });

    return this.http.delete<void>(`${constants.API_URL}/chats/deleteChat/${chatId}`, { headers });
  }
}
