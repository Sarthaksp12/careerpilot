export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

export const AUTH_TOKEN_KEY = "careerpilot_auth_token";
export const ATS_ANALYSIS_KEY = "careerpilot_ats_analysis";

export const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: "LayoutDashboard" },
  { href: "/resume", label: "Resume", icon: "FileText" },
  { href: "/ats", label: "ATS Analysis", icon: "BarChart3" },
  { href: "/jobs", label: "Job Matching", icon: "Briefcase" },
  { href: "/applications", label: "Applications", icon: "Send" },
  { href: "/profile", label: "Profile", icon: "User" },
] as const;

export const APPLICATION_STATUSES = [
  "applied",
  "reviewing",
  "interview",
  "offered",
  "rejected",
] as const;
