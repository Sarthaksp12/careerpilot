"use client";

import { useCallback, useEffect, useState } from "react";
import {
  applicationService,
  jobService,
  resumeService,
} from "@/services";
import type { ActivityItem, DashboardStats } from "@/types";

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats>({
    totalResumes: 0,
    totalJobs: 0,
    totalApplications: 0,
    averageMatchScore: 0,
  });
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);
      const [resumes, jobs, applications] = await Promise.all([
        resumeService.getAll(),
        jobService.getAll(),
        applicationService.getAll().catch(() => []),
      ]);

      setStats({
        totalResumes: resumes.length,
        totalJobs: jobs.length,
        totalApplications: Array.isArray(applications)
          ? applications.length
          : 0,
        averageMatchScore: 0,
      });

      const recentActivities: ActivityItem[] = [
        ...resumes.slice(0, 3).map((resume) => ({
          id: `resume-${resume.id}`,
          type: "resume" as const,
          title: "Resume uploaded",
          description: resume.title,
          timestamp: resume.created_at,
        })),
        ...(Array.isArray(applications)
          ? applications.slice(0, 3).map((app) => ({
              id: `app-${app.id}`,
              type: "application" as const,
              title: "Application submitted",
              description: `Status: ${app.status}`,
              timestamp: app.created_at,
            }))
          : []),
      ]
        .sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        )
        .slice(0, 6);

      setActivities(recentActivities);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load dashboard data"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return { stats, activities, loading, error, refetch: fetchDashboard };
}
