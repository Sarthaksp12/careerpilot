import { api } from "./api";
import type {
  Application,
  ApplicationCreatePayload,
  ApplicationUpdatePayload,
} from "@/types/application";

export const applicationService = {
  async getAll(): Promise<Application[]> {
    const { data } = await api.get<Application[]>("/applications/");
    return data;
  },

  async getById(id: number): Promise<Application> {
    const { data } = await api.get<Application>(`/applications/${id}`);
    return data;
  },

  async create(payload: ApplicationCreatePayload): Promise<Application> {
    const { data } = await api.post<Application>("/applications/", payload);
    return data;
  },

  async update(
    id: number,
    payload: ApplicationUpdatePayload
  ): Promise<Application> {
    const { data } = await api.put<Application>(
      `/applications/${id}`,
      payload
    );
    return data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/applications/${id}`);
  },
};
