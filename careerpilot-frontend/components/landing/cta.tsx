"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/shared/glass-card";

export function CTASection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <GlassCard className="overflow-hidden border-blue-500/20 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10 px-8 py-12 text-center sm:px-12">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to pilot your career forward?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
              Join thousands of professionals using AI to optimize resumes,
              discover opportunities, and track applications with confidence.
            </p>
            <Link
              href="/register"
              className={cn(
                buttonVariants({ size: "lg" }),
                "mt-8 inline-flex h-12 bg-gradient-to-r from-blue-600 to-cyan-500 px-8 text-white hover:from-blue-500 hover:to-cyan-400"
              )}
            >
              Create your free account
              <ArrowRight className="size-4" />
            </Link>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
