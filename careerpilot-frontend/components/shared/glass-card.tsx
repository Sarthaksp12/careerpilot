"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.ComponentProps<typeof motion.div> {
  hover?: boolean;
}

export function GlassCard({
  className,
  children,
  hover = false,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      className={cn(
        "rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-xl",
        hover && "transition-shadow hover:border-blue-500/30 hover:shadow-blue-500/10",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
