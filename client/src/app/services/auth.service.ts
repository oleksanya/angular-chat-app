import { HttpClient, HttpHeaders } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { constants } from '../core/constants';
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  JwtPayload,
} from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  router = inject(Router);

  constructor() {}

  login(email: string, password: string): Observable<boolean> {
    const body: LoginRequest = { email, password };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    });

    return this.http
      .post<AuthResponse>(`${constants.API_URL}/auth/login`, body, {
        headers,
      })
      .pipe(
        map((data: AuthResponse) => {
          try {
            const access_token = data.access_token;
            const decodedToken = jwtDecode<JwtPayload>(access_token);

            localStorage.setItem('user_token', access_token);
            localStorage.setItem(
              'token_expiration',
              decodedToken.exp.toString()
            );
            localStorage.setItem('user_id', decodedToken.sub.toString());

            this.router.navigateByUrl('/');
            return true;
          } catch {
            throw new Error('Failed to process authentication token');
          }
        }),
        catchError(() => of(false))
      );
  }

  register(
    username: string,
    email: string,
    password: string
  ): Observable<boolean> {
    const body: RegisterRequest = { username, email, password };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    });

    return this.http
      .post<AuthResponse>(`${constants.API_URL}/user/sign-up`, body, {
        headers,
      })
      .pipe(
        map((data: AuthResponse) => {
          try {
            const access_token = data.access_token;
            const decodedToken = jwtDecode<JwtPayload>(access_token);

            localStorage.setItem('user_token', access_token);
            localStorage.setItem(
              'token_expiration',
              decodedToken.exp.toString()
            );
            localStorage.setItem('user_id', decodedToken.sub.toString());

            this.router.navigateByUrl('/');
            return true;
          } catch {
            throw new Error('Failed to process authentication token');
          }
        }),
        catchError(() => of(false))
      );
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('user_token');

    if (!token) {
      this.router.navigateByUrl('/auth');
      return false;
    }

    const token_expiration = localStorage.getItem('token_expiration');

    if (!token_expiration || +token_expiration < Date.now() / 1000) {
      localStorage.removeItem('user_token');
      localStorage.removeItem('token_expiration');
      localStorage.removeItem('user_id');
      this.router.navigateByUrl('/auth');
      return false;
    }

    return true;
  }

  getAuthorizationToken(): string | undefined {
    const token = localStorage.getItem('user_token');

    if (!token) {
      return;
    }

    return token;
  }
}
