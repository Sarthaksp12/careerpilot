import { api } from "./api";
import type { User, UserUpdatePayload } from "@/types/user";

export const userService = {
  async getById(id: number): Promise<User> {
    const { data } = await api.get<User>(`/users/${id}`);
    return data;
  },

  async update(id: number, payload: UserUpdatePayload): Promise<User> {
    const { data } = await api.put<User>(`/users/${id}`, payload);
    return data;
  },
};
