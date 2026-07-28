import Link from "next/link";
import { Rocket } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 p-2">
            <Rocket className="size-4 text-white" />
          </div>
          <span className="font-semibold text-white">CareerPilot AI</span>
        </div>

        <div className="flex flex-wrap gap-6 text-sm text-zinc-400">
          <Link href="#features" className="hover:text-white">
            Features
          </Link>
          <Link href="#pricing" className="hover:text-white">
            Pricing
          </Link>
          <Link href="/login" className="hover:text-white">
            Sign in
          </Link>
          <Link href="/register" className="hover:text-white">
            Register
          </Link>
        </div>

        <p className="text-sm text-zinc-500">
          © {new Date().getFullYear()} CareerPilot AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
