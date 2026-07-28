"use client";

import { CheckCircle2, Circle, Clock } from "lucide-react";
import type { Application } from "@/types/application";
import type { Job } from "@/types/job";
import { GlassCard } from "@/components/shared/glass-card";
import { EmptyState } from "@/components/shared/empty-state";
import { Badge } from "@/components/ui/badge";
import { APPLICATION_STATUSES } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface ApplicationsTimelineProps {
  applications: Application[];
  jobs: Job[];
}

const statusColors: Record<string, string> = {
  applied: "bg-blue-500/15 text-blue-300",
  reviewing: "bg-amber-500/15 text-amber-300",
  interview: "bg-purple-500/15 text-purple-300",
  offered: "bg-emerald-500/15 text-emerald-300",
  rejected: "bg-red-500/15 text-red-300",
};

export function ApplicationsTimeline({
  applications,
  jobs,
}: ApplicationsTimelineProps) {
  if (applications.length === 0) {
    return (
      <EmptyState
        icon={Clock}
        title="No applications yet"
        description="Apply to matched jobs and track your progress here."
      />
    );
  }

  const jobMap = new Map(jobs.map((job) => [job.id, job]));

  return (
    <div className="space-y-4">
      {applications.map((application) => {
        const job = jobMap.get(application.job_id);
        const currentIndex = APPLICATION_STATUSES.indexOf(
          application.status as (typeof APPLICATION_STATUSES)[number]
        );

        return (
          <GlassCard key={application.id}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {job?.title ?? `Job #${application.job_id}`}
                </h3>
                <p className="text-sm text-zinc-400">
                  {job?.company ?? "Unknown company"}
                </p>
                <p className="mt-2 text-xs text-zinc-500">
                  Applied {new Date(application.created_at).toLocaleDateString()}
                </p>
              </div>
              <Badge
                className={cn(
                  "capitalize",
                  statusColors[application.status] ??
                    "bg-white/10 text-zinc-300"
                )}
              >
                {application.status}
              </Badge>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {APPLICATION_STATUSES.map((status, index) => {
                const completed = currentIndex >= index && currentIndex !== -1;
                const active = application.status === status;

                return (
                  <div key={status} className="flex items-center gap-2">
                    {completed ? (
                      <CheckCircle2
                        className={cn(
                          "size-4",
                          active ? "text-blue-400" : "text-emerald-400"
                        )}
                      />
                    ) : (
                      <Circle className="size-4 text-zinc-600" />
                    )}
                    <span
                      className={cn(
                        "text-xs capitalize",
                        active ? "text-white" : "text-zinc-500"
                      )}
                    >
                      {status}
                    </span>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        );
      })}
    </div>
  );
}
