"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import { PageHeader } from "@/components/shared/page-header";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { EmptyState } from "@/components/shared/empty-state";
import { ATSAnalysisView } from "@/components/ats/ats-analysis-view";
import { Select } from "@/components/ui/select";
import { GlassCard } from "@/components/shared/glass-card";
import { useResumes } from "@/hooks/use-resumes";
import { getATSAnalysis } from "@/lib/ats-storage";

import type { ATSAnalysis } from "@/types/resume";
import { BarChart3 } from "lucide-react";

function buildAnalysisFromResume(resume: {
  skills: string | null;
}): ATSAnalysis {
  const skills = resume.skills
    ? resume.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  return {
    skills,
    ats_score:
      skills.length > 0 ? Math.min(60 + skills.length * 3, 92) : 0,
    missing_keywords: [],
    strengths: skills.slice(0, 5),
    suggestions: ["Upload a fresh PDF for full AI ATS analysis."],
  };
}

function ATSPageContent() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get("resumeId");

  const { resumes, loading } = useResumes();

  const [selectedId, setSelectedId] = useState<number | "">("");

  useEffect(() => {
    if (initialId) {
      setSelectedId(Number(initialId));
    } else if (resumes[0]) {
      setSelectedId(resumes[0].id);
    }
  }, [initialId, resumes]);

  const selectedResume = useMemo(
    () => resumes.find((resume) => resume.id === selectedId),
    [resumes, selectedId]
  );

  const analysis = useMemo(() => {
    if (!selectedId || !selectedResume) {
      return null;
    }

    return (
      getATSAnalysis(Number(selectedId)) ??
      buildAnalysisFromResume(selectedResume)
    );
  }, [selectedId, selectedResume]);

  if (loading) {
    return <LoadingSpinner label="Loading ATS analysis..." />;
  }

  return (
    <div>
      <PageHeader
        title="ATS Analysis"
        description="Review overall score, skills match, missing keywords, and improvement insights."
      />

      {resumes.length === 0 ? (
        <EmptyState
          icon={BarChart3}
          title="No resume selected"
          description="Upload a resume first to generate ATS analysis."
        />
      ) : (
        <>
          <GlassCard className="mb-6 max-w-md">
            <label className="mb-2 block text-sm text-zinc-400">
              Select resume
            </label>

            <Select
              value={selectedId}
              onChange={(e) =>
                setSelectedId(
                  e.target.value ? Number(e.target.value) : ""
                )
              }
            >
              {resumes.map((resume) => (
                <option key={resume.id} value={resume.id}>
                  {resume.title}
                </option>
              ))}
            </Select>
          </GlassCard>

          {analysis ? (
            <ATSAnalysisView analysis={analysis} />
          ) : null}
        </>
      )}
    </div>
  );
}

export default function ATSPage() {
  return (
    <Suspense
      fallback={<LoadingSpinner label="Loading ATS analysis..." />}
    >
      <ATSPageContent />
    </Suspense>
  );
}