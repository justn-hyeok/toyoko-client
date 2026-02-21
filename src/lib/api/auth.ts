import { api } from "@/lib/api";

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface ProfileResponse {
  id: string;
  email: string;
}

export const authApi = {
  login: (email: string, password: string) =>
    api.post<AuthResponse>("/auth/login", { email, password }),

  register: (email: string, password: string) =>
    api.post<AuthResponse>("/auth/register", { email, password }),

  refresh: (refreshToken: string) =>
    api.post<{ accessToken: string }>("/auth/refresh", { refreshToken }),

  getProfile: (token: string) =>
    api.get<ProfileResponse>("/auth/profile", token),
};
