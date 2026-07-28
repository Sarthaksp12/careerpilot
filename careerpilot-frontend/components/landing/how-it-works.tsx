"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/shared/glass-card";

const steps = [
  {
    step: "01",
    title: "Upload your resume",
    description:
      "Drag and drop your PDF resume. Our AI extracts structured profile data instantly.",
  },
  {
    step: "02",
    title: "Analyze ATS compatibility",
    description:
      "Review your ATS score, keyword coverage, missing skills, and improvement suggestions.",
  },
  {
    step: "03",
    title: "Match with jobs",
    description:
      "Browse recommended roles and see match percentages based on your profile.",
  },
  {
    step: "04",
    title: "Apply and track",
    description:
      "Submit applications and monitor progress with a clear status timeline.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            How CareerPilot AI works
          </h2>
          <p className="mt-4 text-zinc-400">
            A streamlined four-step workflow from resume upload to offer tracking.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="relative h-full">
                <span className="text-5xl font-bold text-blue-500/20">
                  {item.step}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {item.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
