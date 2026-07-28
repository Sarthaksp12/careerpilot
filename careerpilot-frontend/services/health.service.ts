import { api } from "./api";

export const healthService = {
  async check(): Promise<{ status: string }> {
    const { data } = await api.get<{ status: string }>("/api/v1/health");
    return data;
  },
};
