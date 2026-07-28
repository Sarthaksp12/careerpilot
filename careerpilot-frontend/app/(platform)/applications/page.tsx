"use client";

import { PageHeader } from "@/components/shared/page-header";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { ApplicationsTimeline } from "@/components/applications/applications-timeline";
import { useApplications } from "@/hooks/use-applications";
import { useJobs } from "@/hooks/use-jobs";

export default function ApplicationsPage() {
  const {
    applications,
    loading: appsLoading,
    error: appsError,
  } = useApplications();
  const { jobs, loading: jobsLoading } = useJobs();

  if (appsLoading || jobsLoading) {
    return <LoadingSpinner label="Loading applications..." />;
  }

  return (
    <div>
      <PageHeader
        title="Applications"
        description="Track applied jobs and monitor status from submission to offer."
      />

      {appsError ? (
        <p className="mb-6 text-sm text-amber-400">
          {appsError} — backend endpoint may still be in development.
        </p>
      ) : null}

      <ApplicationsTimeline applications={applications} jobs={jobs} />
    </div>
  );
}
