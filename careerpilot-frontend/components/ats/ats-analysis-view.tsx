"use client";

import Link from "next/link";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ATSAnalysis } from "@/types/resume";
import { GlassCard } from "@/components/shared/glass-card";
import { Badge } from "@/components/ui/badge";

interface ATSAnalysisViewProps {
  analysis: ATSAnalysis;
}

const COLORS = ["#3b82f6", "#06b6d4", "#6366f1", "#8b5cf6"];

export function ATSAnalysisView({ analysis }: ATSAnalysisViewProps) {
  const skills = analysis.skills ?? [];
  const missingKeywords = analysis.missing_keywords ?? [];
  const strengths = analysis.strengths ?? [];
  const score = analysis.ats_score ?? 0;

  const keywordChartData = [
    {
      name: "Matched",
      value: Math.max(skills.length, 1),
    },
    {
      name: "Missing",
      value: Math.max(missingKeywords.length, 0),
    },
  ];

  const skillsChartData = skills.slice(0, 8).map((skill, index) => ({
    skill,
    weight: 100 - index * 8,
  }));

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        <GlassCard className="flex flex-col items-center justify-center text-center lg:col-span-1">
          <p className="text-sm text-zinc-400">Overall ATS Score</p>
          <div className="relative mt-4 flex size-40 items-center justify-center">
            <svg className="size-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="url(#scoreGradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${score * 2.64} 264`}
              />
              <defs>
                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
            <span className="absolute text-4xl font-bold text-white">
              {score}
            </span>
          </div>
          {analysis.summary ? (
            <p className="mt-4 text-sm leading-relaxed text-zinc-400">
              {analysis.summary}
            </p>
          ) : null}
        </GlassCard>

        <GlassCard className="lg:col-span-2">
          <h3 className="mb-4 text-lg font-semibold text-white">
            Keyword Analysis
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={keywordChartData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                >
                  {keywordChartData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "#18181b",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <GlassCard>
          <h3 className="mb-4 text-lg font-semibold text-white">Skills Match</h3>
          {skills.length > 0 ? (
            <>
              <div className="mb-4 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge
                    key={skill}
                    className="border-blue-500/20 bg-blue-500/10 text-blue-300"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={skillsChartData}>
                    <CartesianGrid stroke="rgba(255,255,255,0.06)" />
                    <XAxis
                      dataKey="skill"
                      tick={{ fill: "#a1a1aa", fontSize: 11 }}
                      interval={0}
                      angle={-20}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis tick={{ fill: "#a1a1aa", fontSize: 11 }} />
                    <Tooltip
                      contentStyle={{
                        background: "#18181b",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "12px",
                      }}
                    />
                    <Bar dataKey="weight" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </>
          ) : (
            <p className="text-sm text-zinc-400">No skills detected yet.</p>
          )}
        </GlassCard>

        <GlassCard>
          <h3 className="mb-4 text-lg font-semibold text-white">
            Missing Skills & Keywords
          </h3>
          {missingKeywords.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {missingKeywords.map((keyword) => (
                <Badge
                  key={keyword}
                  variant="outline"
                  className="border-red-500/20 bg-red-500/10 text-red-300"
                >
                  {keyword}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-zinc-400">
              No missing keywords identified.
            </p>
          )}

          {strengths.length > 0 ? (
            <div className="mt-6">
              <h4 className="mb-2 text-sm font-medium text-white">Strengths</h4>
              <ul className="space-y-2 text-sm text-zinc-400">
                {strengths.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {(analysis.suggestions ?? []).length > 0 ? (
            <div className="mt-6">
              <h4 className="mb-2 text-sm font-medium text-white">
                Suggestions
              </h4>
              <ul className="space-y-2 text-sm text-zinc-400">
                {(analysis.suggestions ?? []).map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </GlassCard>
      </div>
    </div>
  );
}
