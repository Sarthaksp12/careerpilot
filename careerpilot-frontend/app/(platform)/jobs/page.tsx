"use client";

import { PageHeader } from "@/components/shared/page-header";
import { JobMatchingPanel } from "@/components/jobs/job-matching-panel";
import { useJobs } from "@/hooks/use-jobs";
import { useResumes } from "@/hooks/use-resumes";

export default function JobsPage() {
  const { jobs, loading: jobsLoading, error: jobsError } = useJobs();
  const { resumes, loading: resumesLoading } = useResumes();

  return (
    <div>
      <PageHeader
        title="Job Matching"
        description="Discover recommended jobs, calculate match percentages, filter roles, and apply."
      />

      {jobsError ? (
        <p className="mb-6 text-sm text-red-400">{jobsError}</p>
      ) : null}

      <JobMatchingPanel
        jobs={jobs}
        resumes={resumes}
        loading={jobsLoading || resumesLoading}
      />
    </div>
  );
}
