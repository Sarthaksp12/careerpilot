"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { authService, userService } from "@/services";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GlassCard } from "@/components/shared/glass-card";
import { LoadingSpinner } from "@/components/shared/loading-spinner";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export function ProfileSettings() {
  const { user, loading, refetch } = useAuth();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    if (user) {
      reset({ name: user.name, email: user.email });
    }
  }, [user, reset]);

  const onSubmit = async (values: ProfileFormValues) => {
    if (!user) return;

    try {
      setError(null);
      setMessage(null);
      await userService.update(user.id, values);
      await refetch();
      setMessage("Profile updated successfully.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
    }
  };

  if (loading) return <LoadingSpinner label="Loading profile..." />;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <GlassCard>
        <h3 className="mb-6 text-lg font-semibold text-white">User Info</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>
            <Input
              id="name"
              className="h-10 border-white/10 bg-white/5 text-white"
              {...register("name")}
            />
            {errors.name ? (
              <p className="text-xs text-red-400">{errors.name.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              className="h-10 border-white/10 bg-white/5 text-white"
              {...register("email")}
            />
            {errors.email ? (
              <p className="text-xs text-red-400">{errors.email.message}</p>
            ) : null}
          </div>

          {message ? <p className="text-sm text-emerald-400">{message}</p> : null}
          {error ? <p className="text-sm text-red-400">{error}</p> : null}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save changes"
            )}
          </Button>
        </form>
      </GlassCard>

      <GlassCard>
        <h3 className="mb-6 text-lg font-semibold text-white">Settings</h3>
        <div className="space-y-4 text-sm text-zinc-400">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="font-medium text-white">Account ID</p>
            <p className="mt-1">{user?.id ?? "—"}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="font-medium text-white">Member since</p>
            <p className="mt-1">
              {user?.created_at
                ? new Date(user.created_at).toLocaleDateString()
                : "—"}
            </p>
          </div>
          <Button
            variant="destructive"
            onClick={() => authService.logout()}
            className="w-full"
          >
            Sign out of all sessions
          </Button>
        </div>
      </GlassCard>
    </div>
  );
}
