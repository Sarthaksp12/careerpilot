"use client";

import { useCallback, useEffect, useState } from "react";
import { resumeService } from "@/services";
import type { Resume } from "@/types/resume";

export function useResumes() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchResumes = useCallback(async () => {
    try {
      setLoading(true);
      const data = await resumeService.getAll();
      setResumes(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load resumes");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchResumes();
  }, [fetchResumes]);

  const deleteResume = useCallback(
    async (id: number) => {
      await resumeService.delete(id);
      await fetchResumes();
    },
    [fetchResumes]
  );

  return { resumes, loading, error, refetch: fetchResumes, deleteResume };
}
