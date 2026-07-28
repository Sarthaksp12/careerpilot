"use client";

import { useEffect, useMemo, useState } from "react";
import { jobService } from "@/services";
import type { Job, JobFilters } from "@/types/job";

export function useJobs(filters?: JobFilters) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch live jobs
  const fetchJobs = async (query: string = "software engineer") => {
    try {
      setLoading(true);
      setError(null);

      const data = await jobService.searchLive(query);

      console.log("Fetched Jobs:", data);

      setJobs(data ?? []);
    } catch (err) {
      console.error("Fetch Jobs Error:", err);
      setError("Failed to fetch jobs");
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  // Search jobs
  const searchJobs = async (query: string) => {
    try {
      setLoading(true);
      setError(null);

      const data = await jobService.searchLive(
        query.trim() || "software engineer"
      );

      console.log("Search Result:", data);

      setJobs(data ?? []);
    } catch (err) {
      console.error("Search Error:", err);
      setError("Failed to search jobs");
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  // Load jobs on page open
  useEffect(() => {
    fetchJobs("software engineer");
  }, []);

  // Apply filters
  const filteredJobs = useMemo(() => {
    if (!filters) return jobs;

    return jobs.filter((job) => {
      const search = filters.search?.toLowerCase().trim();
      const location = filters.location?.toLowerCase().trim();
      const jobType = filters.job_type?.toLowerCase().trim();

      if (search) {
        const text =
          `${job.title} ${job.company} ${job.description}`.toLowerCase();

        if (!text.includes(search)) {
          return false;
        }
      }

      if (location) {
        if (!job.location?.toLowerCase().includes(location)) {
          return false;
        }
      }

      if (jobType) {
        if (job.job_type?.toLowerCase() !== jobType) {
          return false;
        }
      }

      return true;
    });
  }, [jobs, filters]);

  return {
    jobs: filteredJobs,
    loading,
    error,
    refetch: fetchJobs,
    searchJobs,
  };
}