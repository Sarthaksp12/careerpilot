import type { ATSAnalysis } from "@/types/resume";
import { ATS_ANALYSIS_KEY } from "@/lib/constants";

type AnalysisCache = Record<string, ATSAnalysis>;

function readCache(): AnalysisCache {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(ATS_ANALYSIS_KEY);
    return raw ? (JSON.parse(raw) as AnalysisCache) : {};
  } catch {
    return {};
  }
}

function writeCache(cache: AnalysisCache): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(ATS_ANALYSIS_KEY, JSON.stringify(cache));
}

export function saveATSAnalysis(resumeId: number, analysis: ATSAnalysis): void {
  const cache = readCache();
  cache[String(resumeId)] = analysis;
  writeCache(cache);
}

export function getATSAnalysis(resumeId: number): ATSAnalysis | null {
  const cache = readCache();
  return cache[String(resumeId)] ?? null;
}
