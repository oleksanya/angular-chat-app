import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { constants } from '../constants';
import { Observable } from 'rxjs';
import { User } from '../shared/chat.interface';

interface JwtPayload {
  sub: string;
  [key: string]: unknown;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserId(): string {
    const userToken = localStorage.getItem('user_token');

    if (!userToken) {
      throw new Error('No user token found');
    }

    const decodedToken = jwtDecode<JwtPayload>(userToken);
    return decodedToken.sub;
  }

  getUserData(): Observable<User & { chats?: string[]; friends?: string[] }> {
    const userId = this.getUserId();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    });

    return this.http.get<User & { chats?: string[]; friends?: string[] }>(
      `${constants.API_URL}/user/${userId}`,
      { headers }
    );
  }

  getUserDataById(userId: string): Observable<User> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    });

    return this.http.get<User>(`${constants.API_URL}/user/${userId}`, {
      headers,
    });
  }
}
