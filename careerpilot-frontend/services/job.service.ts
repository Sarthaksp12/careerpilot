import { api } from "./api";
import type { Job, JobMatchResult } from "@/types/job";

export const jobService = {
  async getAll(): Promise<Job[]> {
    const { data } = await api.get<Job[]>("/job/");
    return data;
  },

  async getById(id: number): Promise<Job> {
    const { data } = await api.get<Job>(`/job/${id}`);
    return data;
  },

  async search(query: string): Promise<Job[]> {
    const { data } = await api.get<Job[]>("/job/search", {
      params: { query },
    });

    return data;
  },

  async searchLive(query: string): Promise<Job[]> {
    const { data } = await api.get<{
      success: boolean;
      count: number;
      jobs: Job[];
    }>("/job/search-live", {
      params: {
        query,
        page: 1,
      },
    });

    console.log("API Response:", data);
    console.log("Jobs from API:", data.jobs);

    return data.jobs ?? [];
  },

  async match(
    jobId: number,
    resumeId: number
  ): Promise<JobMatchResult> {
    const { data } = await api.post<JobMatchResult>(
      `/job/${jobId}/match/${resumeId}`
    );

    return data;
  },

  async create(job: Partial<Job>): Promise<Job> {
    const { data } = await api.post<Job>("/job/", job);
    return data;
  },

  async update(id: number, job: Partial<Job>): Promise<Job> {
    const { data } = await api.put<Job>(`/job/${id}`, job);
    return data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/job/${id}`);
  },
};