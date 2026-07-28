"use client";

import { LucideIcon } from "lucide-react";
import { GlassCard } from "@/components/shared/glass-card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: string;
  className?: string;
}

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  className,
}: StatCardProps) {
  return (
    <GlassCard className={cn("p-5", className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="text-sm text-zinc-400">{title}</p>
          <p className="text-3xl font-semibold text-white">{value}</p>
          {description ? (
            <p className="text-xs text-zinc-500">{description}</p>
          ) : null}
          {trend ? (
            <p className="text-xs font-medium text-emerald-400">{trend}</p>
          ) : null}
        </div>
        <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400">
          <Icon className="size-5" />
        </div>
      </div>
    </GlassCard>
  );
}
