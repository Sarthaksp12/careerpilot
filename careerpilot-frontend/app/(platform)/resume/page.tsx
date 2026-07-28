"use client";

import { Sparkles, Upload } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { GlassCard } from "@/components/shared/glass-card";
import { ResumeUploader } from "@/components/resume/resume-uploader";
import { ResumeHistory } from "@/components/resume/resume-history";
import { useResumes } from "@/hooks/use-resumes";

export default function ResumePage() {
  const { resumes, loading, error, deleteResume } = useResumes();

  return (
    <div className="space-y-8">
      <PageHeader
        title="AI Resume Analyzer"
        description="Upload your resume, get AI-powered insights, ATS analysis, and manage all your resumes in one place."
      />

      {error && (
        <p className="text-sm text-red-400">
          {error}
        </p>
      )}

      <GlassCard className="overflow-hidden bg-gradient-to-r from-blue-600/20 via-cyan-500/10 to-purple-600/20">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">
              🚀 Resume Intelligence
            </h2>

            <p className="mt-2 max-w-2xl text-zinc-300">
              Upload your resume and let CareerPilot AI extract skills,
              analyze your profile, calculate ATS compatibility, and prepare
              you for your next opportunity.
            </p>
          </div>

          <div className="rounded-xl border border-cyan-400/30 bg-cyan-500/10 p-5">
            <Sparkles className="mb-2 h-8 w-8 text-cyan-300" />

            <p className="text-sm text-cyan-300">
              Gemini AI Powered
            </p>

            <p className="mt-2 text-3xl font-bold text-white">
              ATS Ready
            </p>
          </div>
        </div>
      </GlassCard>

      <div className="grid gap-8 lg:grid-cols-2">

        <GlassCard>
          <div className="mb-5 flex items-center gap-2">
            <Upload className="h-5 w-5 text-blue-400" />

            <h2 className="text-lg font-semibold text-white">
              Upload Resume
            </h2>
          </div>

          <ResumeUploader />
        </GlassCard>

        <GlassCard>
          <h2 className="mb-5 text-lg font-semibold text-white">
            Resume History
          </h2>

          {loading ? (
            <LoadingSpinner label="Loading resumes..." />
          ) : (
            <ResumeHistory
              resumes={resumes}
              onDelete={deleteResume}
            />
          )}
        </GlassCard>

      </div>

      <GlassCard>
        <h2 className="mb-6 text-xl font-semibold text-white">
          ✨ AI Features
        </h2>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <div className="text-3xl">📄</div>
            <h3 className="mt-3 font-semibold text-white">
              Resume Parsing
            </h3>

            <p className="mt-2 text-sm text-zinc-400">
              Extracts skills, education, projects and experience.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <div className="text-3xl">🤖</div>
            <h3 className="mt-3 font-semibold text-white">
              Gemini AI Analysis
            </h3>

            <p className="mt-2 text-sm text-zinc-400">
              Generates intelligent feedback and improvement suggestions.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <div className="text-3xl">🎯</div>
            <h3 className="mt-3 font-semibold text-white">
              ATS Optimization
            </h3>

            <p className="mt-2 text-sm text-zinc-400">
              Improve your resume for Applicant Tracking Systems.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <div className="text-3xl">💼</div>
            <h3 className="mt-3 font-semibold text-white">
              Job Matching
            </h3>

            <p className="mt-2 text-sm text-zinc-400">
              Match your resume with jobs using AI.
            </p>
          </div>

        </div>
      </GlassCard>
    </div>
  );
}