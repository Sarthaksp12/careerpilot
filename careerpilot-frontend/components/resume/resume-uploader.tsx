"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FileUp, Upload, X } from "lucide-react";
import { resumeService } from "@/services";
import { saveATSAnalysis } from "@/lib/ats-storage";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { GlassCard } from "@/components/shared/glass-card";
import { cn } from "@/lib/utils";

export function ResumeUploader() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback((selected: File | null) => {
    if (!selected) return;
    if (!selected.name.toLowerCase().endsWith(".pdf")) {
      setError("Only PDF files are supported.");
      return;
    }
    setError(null);
    setFile(selected);
    setProgress(0);
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setDragging(false);
      handleFile(event.dataTransfer.files?.[0] ?? null);
    },
    [handleFile]
  );

  const upload = async () => {
    if (!file) return;

    try {
      setUploading(true);
      setError(null);
      const response = await resumeService.upload(file, setProgress);
      saveATSAnalysis(response.resume_id, response.analysis);
      router.push(`/ats?resumeId=${response.resume_id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <GlassCard>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={cn(
          "flex flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-12 text-center transition-colors",
          dragging
            ? "border-blue-400 bg-blue-500/10"
            : "border-white/15 bg-white/5"
        )}
      >
        <div className="mb-4 rounded-full bg-blue-500/10 p-4 text-blue-400">
          <Upload className="size-8" />
        </div>
        <h3 className="text-lg font-medium text-white">
          Drag & drop your resume
        </h3>
        <p className="mt-2 text-sm text-zinc-400">PDF only, up to 10MB</p>

        <label className="mt-6">
          <input
            type="file"
            accept=".pdf,application/pdf"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
          />
          <span className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10">
            <FileUp className="size-4" />
            Browse files
          </span>
        </label>
      </div>

      {file ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">
                {file.name}
              </p>
              <p className="text-xs text-zinc-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setFile(null)}
              disabled={uploading}
            >
              <X className="size-4" />
            </Button>
          </div>

          {uploading ? (
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-xs text-zinc-400">
                <span>Uploading & analyzing...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} />
            </div>
          ) : (
            <Button
              onClick={upload}
              className="mt-4 w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
            >
              Upload & analyze
            </Button>
          )}
        </motion.div>
      ) : null}

      {error ? <p className="mt-4 text-sm text-red-400">{error}</p> : null}
    </GlassCard>
  );
}
