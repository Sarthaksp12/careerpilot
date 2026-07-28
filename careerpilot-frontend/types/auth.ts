export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token?: string;
  token?: string;
  user?: {
    id: number;
    name: string;
    email: string;
  };
  message?: string;
}
