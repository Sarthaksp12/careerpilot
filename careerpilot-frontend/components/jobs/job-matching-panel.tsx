"use client";

import { useMemo, useState } from "react";
import { Briefcase, MapPin, Sparkles } from "lucide-react";
import type { Job, JobMatchResult } from "@/types/job";
import type { Resume } from "@/types/resume";
import { applicationService, jobService } from "@/services";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { GlassCard } from "@/components/shared/glass-card";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/shared/loading-spinner";

interface JobMatchingPanelProps {
  jobs: Job[];
  resumes: Resume[];
  loading?: boolean;
}

export function JobMatchingPanel({
  jobs,
  resumes,
  loading,
}: JobMatchingPanelProps) {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [selectedResumeId, setSelectedResumeId] = useState<number | "">(
    resumes[0]?.id ?? ""
  );
  const [matchResults, setMatchResults] = useState<
    Record<number, JobMatchResult>
  >({});
  const [matchingJobId, setMatchingJobId] = useState<number | null>(null);
  const [applyingJobId, setApplyingJobId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const q = search.toLowerCase().trim();
      if (q) {
        const haystack =
          `${job.title} ${job.company} ${job.description}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (
        location &&
        !job.location?.toLowerCase().includes(location.toLowerCase())
      ) {
        return false;
      }
      if (jobType && job.job_type?.toLowerCase() !== jobType.toLowerCase()) {
        return false;
      }
      return true;
    });
  }, [jobs, search, location, jobType]);

  const jobTypes = useMemo(() => {
    return [...new Set(jobs.map((j) => j.job_type).filter(Boolean))] as string[];
  }, [jobs]);

  const runMatch = async (jobId: number) => {
    if (!selectedResumeId) {
      setError("Select a resume to calculate match score.");
      return;
    }

    try {
      setError(null);
      setMatchingJobId(jobId);
      const result = await jobService.match(jobId, Number(selectedResumeId));
      setMatchResults((prev) => ({ ...prev, [jobId]: result }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Match failed");
    } finally {
      setMatchingJobId(null);
    }
  };

  const applyToJob = async (jobId: number) => {
    if (!selectedResumeId) {
      setError("Select a resume before applying.");
      return;
    }

    try {
      setError(null);
      setApplyingJobId(jobId);
      await applicationService.create({
        job_id: jobId,
        resume_id: Number(selectedResumeId),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Application failed");
    } finally {
      setApplyingJobId(null);
    }
  };

  if (loading) return <LoadingSpinner label="Loading jobs..." />;

  return (
    <div className="space-y-6">
      <GlassCard className="grid gap-4 md:grid-cols-4">
        <Input
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-10 border-white/10 bg-white/5 text-white md:col-span-2"
        />
        <Input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="h-10 border-white/10 bg-white/5 text-white"
        />
        <Select value={jobType} onChange={(e) => setJobType(e.target.value)}>
          <option value="">All job types</option>
          {jobTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </Select>
      </GlassCard>

      <GlassCard>
        <label className="mb-2 block text-sm text-zinc-400">
          Resume for matching
        </label>
        <Select
          value={selectedResumeId}
          onChange={(e) =>
            setSelectedResumeId(e.target.value ? Number(e.target.value) : "")
          }
          className="max-w-md"
        >
          <option value="">Select resume</option>
          {resumes.map((resume) => (
            <option key={resume.id} value={resume.id}>
              {resume.title}
            </option>
          ))}
        </Select>
      </GlassCard>

      {error ? <p className="text-sm text-red-400">{error}</p> : null}

      <div className="grid gap-4">
        {filteredJobs.map((job) => {
          const match = job.id ? matchResults[job.id] : undefined;
          const score = match?.match_score;
          const isLiveJob = !!job.apply_link;

          return (
            <GlassCard key={job.id} hover>
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-semibold text-white">
                      {job.title}
                    </h3>
                    {typeof score === "number" ? (
                      <Badge className="bg-emerald-500/15 text-emerald-300">
                        {score}% match
                      </Badge>
                    ) : null}
                  </div>
                  <p className="mt-1 flex items-center gap-2 text-sm text-zinc-400">
                    <Briefcase className="size-4" />
                    {job.company}
                  </p>
                  {job.location ? (
                    <p className="mt-1 flex items-center gap-2 text-sm text-zinc-500">
                      <MapPin className="size-4" />
                      {job.location}
                    </p>
                  ) : null}
                  <p className="mt-3 line-clamp-3 text-sm text-zinc-400">
                    {job.description}
                  </p>
                  {match?.matched_skills?.length ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {match.matched_skills.slice(0, 6).map((skill) => (
                        <Badge
                          key={skill}
                          className="bg-blue-500/10 text-blue-300"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  ) : null}
                </div>

                <div className="flex shrink-0 flex-col gap-2 sm:flex-row lg:flex-col">
                  {isLiveJob ? (
                    <a
                      href={job.apply_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white w-full">
                        Apply Now
                      </Button>
                    </a>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        onClick={() => {
                          if (job.id) {
                            runMatch(job.id);
                          }
                        }}
                        disabled={matchingJobId === job.id}
                        className="border-white/15 bg-white/5 text-white"
                      >
                        <Sparkles className="size-4" />
                        {matchingJobId === job.id ? "Matching..." : "Calculate match"}
                      </Button>
                      <Button
                        onClick={() => {
                          if (job.id) {
                            applyToJob(job.id);
                          }
                        }}
                        disabled={applyingJobId === job.id}
                        className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
                      >
                        {applyingJobId === job.id ? "Applying..." : "Apply"}
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}
