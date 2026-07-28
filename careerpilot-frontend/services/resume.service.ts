import { api } from "./api";
import type { Resume, ResumeUploadResponse } from "@/types/resume";

export const resumeService = {
  async getAll(): Promise<Resume[]> {
    const { data } = await api.get<Resume[]>("/resumes/");
    return data;
  },

  async getById(id: number): Promise<Resume> {
    const { data } = await api.get<Resume>(`/resumes/${id}`);
    return data;
  },

  async upload(
    file: File,
    onProgress?: (progress: number) => void
  ): Promise<ResumeUploadResponse> {
    const formData = new FormData();
    formData.append("file", file);

    const { data } = await api.post<ResumeUploadResponse>(
      "/resumes/upload",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (event) => {
          if (!event.total || !onProgress) return;
          onProgress(Math.round((event.loaded * 100) / event.total));
        },
      }
    );

    return data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/resumes/${id}`);
  },
};
