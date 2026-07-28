"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Rocket } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function LandingNavbar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 p-2">
            <Rocket className="size-4 text-white" />
          </div>
          <span className="font-semibold text-white">CareerPilot AI</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <a href="#features" className="text-sm text-zinc-400 hover:text-white">
            Features
          </a>
          <a href="#how-it-works" className="text-sm text-zinc-400 hover:text-white">
            How it works
          </a>
          <a href="#pricing" className="text-sm text-zinc-400 hover:text-white">
            Pricing
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className={cn(buttonVariants({ variant: "ghost" }), "text-zinc-300")}
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className={cn(
              buttonVariants({ size: "default" }),
              "bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-500 hover:to-cyan-400"
            )}
          >
            Get started
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
