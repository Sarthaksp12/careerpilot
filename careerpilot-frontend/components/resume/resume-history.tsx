"use client";

import Link from "next/link";
import { Trash2, FileText } from "lucide-react";
import type { Resume } from "@/types/resume";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/shared/glass-card";
import { EmptyState } from "@/components/shared/empty-state";

interface ResumeHistoryProps {
  resumes: Resume[];
  onDelete: (id: number) => Promise<void>;
}

export function ResumeHistory({ resumes, onDelete }: ResumeHistoryProps) {
  if (resumes.length === 0) {
    return (
      <EmptyState
        icon={FileText}
        title="No resumes yet"
        description="Upload your first PDF resume to start AI analysis and job matching."
      />
    );
  }

  return (
    <div className="space-y-4">
      {resumes.map((resume) => (
        <GlassCard key={resume.id} className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="truncate font-medium text-white">{resume.title}</p>
              <p className="mt-1 text-sm text-zinc-400">
                Uploaded {new Date(resume.created_at).toLocaleDateString()}
              </p>
              {resume.skills ? (
                <p className="mt-2 line-clamp-2 text-xs text-zinc-500">
                  Skills: {resume.skills}
                </p>
              ) : null}
            </div>
            <div className="flex gap-2">
              <Link
                href={`/ats?resumeId=${resume.id}`}
                className={cn(buttonVariants({ variant: "outline" }))}
              >
                View analysis
              </Link>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => onDelete(resume.id)}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          </div>
        </GlassCard>
      ))}
    </div>
  );
}
