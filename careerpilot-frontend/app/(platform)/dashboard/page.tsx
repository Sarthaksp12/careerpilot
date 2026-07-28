"use client";

import {
  Activity,
  Briefcase,
  FileText,
  Send,
  TrendingUp,
} from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { GlassCard } from "@/components/shared/glass-card";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { useDashboardStats } from "@/hooks/use-dashboard";

export default function DashboardPage() {
  const { stats, activities, loading, error } = useDashboardStats();

  if (loading) {
    return <LoadingSpinner label="Loading dashboard..." />;
  }

  return (
    <div>
      <PageHeader
        title="CareerPilot AI Dashboard"
        description="Track your resumes, discover jobs, analyze matches, and manage your career journey."
      />

      {error ? <p className="mb-6 text-sm text-red-400">{error}</p> : null}

      <GlassCard className="mb-8 overflow-hidden bg-gradient-to-r from-blue-600/20 via-cyan-500/10 to-purple-600/20">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">
              🚀 Welcome to CareerPilot AI
            </h2>

            <p className="mt-2 max-w-2xl text-zinc-300">
              Upload your resume, discover live jobs, calculate AI match scores,
              and land your next opportunity faster.
            </p>
          </div>

          <div className="rounded-xl border border-cyan-400/30 bg-cyan-500/10 px-6 py-4">
            <p className="text-sm text-cyan-300">
              AI Powered Career Assistant
            </p>

            <p className="mt-2 text-3xl font-bold text-white">
              Ready 🚀
            </p>
          </div>
        </div>
      </GlassCard>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Resumes"
          value={stats.totalResumes}
          icon={FileText}
          description="AI analyzed resumes"
        />
        <StatCard
          title="Jobs Discovered"
          value={stats.totalJobs}
          icon={Briefcase}
          description="Live jobs from JSearch"
        />
        <StatCard
          title="Applications Sent"
          value={stats.totalApplications}
          icon={Send}
          description="Successfully applied"
        />
        <StatCard
          title="AI Match Score"
          value={`${stats.averageMatchScore}%`}
          icon={TrendingUp}
          description="Gemini AI Analysis"
        />
      </div>

      <GlassCard className="mt-6">
        <h3 className="mb-4 text-lg font-semibold text-white">
          Today Progress
        </h3>

        <div className="grid gap-4 md:grid-cols-4">
          <div>
            <p className="text-3xl font-bold text-cyan-400">
              {stats.totalResumes}
            </p>

            <p className="text-sm text-zinc-400">
              Resumes Uploaded
            </p>
          </div>

          <div>
            <p className="text-3xl font-bold text-green-400">
              {stats.totalJobs}
            </p>

            <p className="text-sm text-zinc-400">
              Jobs Available
            </p>
          </div>

          <div>
            <p className="text-3xl font-bold text-purple-400">
              {stats.totalApplications}
            </p>

            <p className="text-sm text-zinc-400">
              Applications
            </p>
          </div>

          <div>
            <p className="text-3xl font-bold text-yellow-400">
              {stats.averageMatchScore}%
            </p>

            <p className="text-sm text-zinc-400">
              AI Match
            </p>
          </div>
        </div>
      </GlassCard>

      <GlassCard className="mt-8">
        <div className="mb-6 flex items-center gap-2">
          <Activity className="size-5 text-blue-400" />
          <h2 className="text-lg font-semibold text-white">
            📈 Career Activity Timeline
          </h2>
        </div>

        {activities.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-lg text-zinc-300">
              🚀 You're all set!
            </p>

            <p className="mt-2 text-zinc-500">
              Upload a resume or search for jobs to begin tracking your career progress.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex flex-col gap-1 rounded-xl border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium text-white">{activity.title}</p>
                  <p className="text-sm text-zinc-400">{activity.description}</p>
                </div>
                <p className="text-xs text-zinc-500">
                  {new Date(activity.timestamp).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </GlassCard>
    </div>
  );
}
