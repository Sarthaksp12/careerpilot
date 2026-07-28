export * from "./auth";
export * from "./user";
export * from "./resume";
export * from "./job";
export * from "./application";

export interface DashboardStats {
  totalResumes: number;
  totalJobs: number;
  totalApplications: number;
  averageMatchScore: number;
}

export interface ActivityItem {
  id: string;
  type: "resume" | "job" | "application" | "analysis";
  title: string;
  description: string;
  timestamp: string;
}
