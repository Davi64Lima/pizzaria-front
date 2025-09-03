export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface IAuthState {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IRegisterRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface IAuthResponse {
  user: IUser;
  access_token: string;
  refresh_token?: string;
}

export interface ITokenPayload {
  sub: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}
