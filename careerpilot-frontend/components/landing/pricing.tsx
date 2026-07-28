"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/shared/glass-card";

const plans = [
  {
    name: "Starter",
    price: "$0",
    period: "/month",
    description: "Perfect for exploring AI resume insights.",
    features: [
      "1 resume upload",
      "Basic ATS analysis",
      "Job recommendations",
      "Email support",
    ],
    cta: "Get started",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    description: "For active job seekers who apply weekly.",
    features: [
      "Unlimited resume uploads",
      "Advanced ATS insights",
      "Job match scoring",
      "Application tracking",
      "Priority support",
    ],
    cta: "Start Pro trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For teams, bootcamps, and career services.",
    features: [
      "Team dashboard",
      "Bulk resume processing",
      "Custom integrations",
      "Dedicated success manager",
      "SLA support",
    ],
    cta: "Contact sales",
    highlighted: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-zinc-400">
            Start free and upgrade as your job search accelerates.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard
                className={
                  plan.highlighted
                    ? "relative h-full border-blue-500/40 bg-blue-500/5 shadow-blue-500/10"
                    : "h-full"
                }
              >
                {plan.highlighted ? (
                  <span className="mb-4 inline-flex rounded-full bg-blue-500/20 px-3 py-1 text-xs font-medium text-blue-300">
                    Most popular
                  </span>
                ) : null}
                <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
                <div className="mt-4 flex items-end gap-1">
                  <span className="text-4xl font-bold text-white">
                    {plan.price}
                  </span>
                  <span className="pb-1 text-zinc-500">{plan.period}</span>
                </div>
                <p className="mt-3 text-sm text-zinc-400">{plan.description}</p>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-zinc-300"
                    >
                      <Check className="mt-0.5 size-4 shrink-0 text-blue-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/register"
                  className={cn(
                    buttonVariants({
                      variant: plan.highlighted ? "default" : "outline",
                    }),
                    "mt-8 w-full",
                    plan.highlighted
                      ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
                      : "border-white/15 bg-white/5 text-white hover:bg-white/10"
                  )}
                >
                  {plan.cta}
                </Link>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
