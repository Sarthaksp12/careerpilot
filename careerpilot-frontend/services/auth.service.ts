import { api, clearAuthToken, setAuthToken } from "./api";
import type { AuthResponse, LoginPayload, RegisterPayload } from "@/types/auth";
import type { User } from "@/types/user";

export const authService = {
  async login(payload: LoginPayload): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>("/auth/login", payload);
    const token = data.access_token ?? data.token;
    if (token) setAuthToken(token);
    return data;
  },

  async register(payload: RegisterPayload): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>("/auth/register", payload);
    const token = data.access_token ?? data.token;
    if (token) setAuthToken(token);
    return data;
  },

  async getCurrentUser(): Promise<User> {
    const { data } = await api.get<User>("/auth/me");
    return data;
  },

  logout(): void {
    clearAuthToken();
  },
};
