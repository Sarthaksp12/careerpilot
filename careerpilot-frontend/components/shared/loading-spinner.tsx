import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  className?: string;
  label?: string;
}

export function LoadingSpinner({ className, label }: LoadingSpinnerProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 py-12 text-zinc-400",
        className
      )}
    >
      <Loader2 className="size-8 animate-spin text-blue-400" />
      {label ? <p className="text-sm">{label}</p> : null}
    </div>
  );
}
