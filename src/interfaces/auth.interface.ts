export interface LoginPayload {
  name: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

export interface LogoutResponse {
  message: string;
}
