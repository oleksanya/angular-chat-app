import { 
  HttpClient,
  HttpHeaders
} from "@angular/common/http";
import { jwtDecode } from "jwt-decode";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { constants } from "../constants";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(email: string, password: string): void {
    const body = { email, password };
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    
    this.http.post(`${constants.API_URL}/auth/login`, body, { headers }).subscribe((data: any) => {
      try {
        const access_token = data.access_token;

        localStorage.setItem('user_token', access_token);
        localStorage.setItem('token_expiration', jwtDecode(access_token).exp!.toString());
        localStorage.setItem('user_id', jwtDecode(access_token).sub!.toString());
        
        this.router.navigateByUrl('/');
      } catch (err) {
        console.error(err);
      }
    });
  }

  register(
    username: string,
    email: string,
    password: string
  ): void {
    const body = { username, email, password };
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    this.http.post(`${constants.API_URL}/user/sign-up`, body, { headers }).subscribe((data: any) => {
      try {
        const access_token = data.access_token;
        localStorage.setItem('user_token', access_token);
        localStorage.setItem('token_expiration', jwtDecode(access_token).exp!.toString());
        localStorage.setItem('user_id', jwtDecode(access_token).sub!.toString());

        this.router.navigateByUrl('/');
      } catch (err) {
        console.error(err);
      }
    });
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('user_token');

    if (!token) {
      this.router.navigateByUrl('/auth');
      return false;
    }

    const token_expiration = localStorage.getItem('token_expiration');

    if (+token_expiration! < (Date.now() / 1000)) {
      localStorage.removeItem('user_token');
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