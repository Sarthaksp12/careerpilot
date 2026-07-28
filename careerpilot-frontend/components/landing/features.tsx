"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  Briefcase,
  FileSearch,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import { GlassCard } from "@/components/shared/glass-card";

const features = [
  {
    icon: FileSearch,
    title: "Smart Resume Parsing",
    description:
      "Upload PDF resumes and extract skills, experience, and education automatically.",
  },
  {
    icon: BarChart3,
    title: "ATS Score Analysis",
    description:
      "Get actionable ATS insights with keyword gaps, strengths, and improvement tips.",
  },
  {
    icon: Target,
    title: "Job Match Engine",
    description:
      "Compare your profile against job descriptions and receive match percentages.",
  },
  {
    icon: Briefcase,
    title: "Application Tracking",
    description:
      "Track every application with status timelines from applied to offer.",
  },
  {
    icon: Sparkles,
    title: "AI Recommendations",
    description:
      "Receive personalized suggestions to improve resume quality and job fit.",
  },
  {
    icon: Zap,
    title: "Fast Workflow",
    description:
      "Move from upload to insights to applications in minutes, not hours.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Everything you need to accelerate your career
          </h2>
          <p className="mt-4 text-zinc-400">
            Built for modern job seekers who want data-driven insights and a
            polished application workflow.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <GlassCard hover className="h-full">
                <div className="mb-4 inline-flex rounded-xl bg-blue-500/10 p-3 text-blue-400">
                  <feature.icon className="size-5" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {feature.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
