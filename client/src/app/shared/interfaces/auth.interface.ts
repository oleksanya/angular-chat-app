export interface AuthResponse {
  message: string;
  access_token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface JwtPayload {
  sub: string;
  email: string;
  exp: number;
  iat: number;
}

export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}

export interface AuthState {
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  username: string;
  email: string;
  password: string;
}
