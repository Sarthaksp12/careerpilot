"use client";

import { Menu, Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/use-auth";

interface NavbarProps {
  onMenuClick?: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const { user } = useAuth();
  const initials = user?.name
    ?.split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onMenuClick}
          >
            <Menu className="size-5" />
          </Button>
          <div className="relative hidden sm:block">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-500" />
            <Input
              placeholder="Search..."
              className="w-64 border-white/10 bg-white/5 pl-9 text-white placeholder:text-zinc-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="text-zinc-400">
            <Bell className="size-4" />
          </Button>
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
            <Avatar className="size-8">
              <AvatarFallback className="bg-blue-500/20 text-blue-300">
                {initials ?? "CP"}
              </AvatarFallback>
            </Avatar>
            <div className="hidden text-sm sm:block">
              <p className="font-medium text-white">
                {user?.name ?? "CareerPilot User"}
              </p>
              <p className="text-xs text-zinc-500">
                {user?.email ?? "user@careerpilot.ai"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
