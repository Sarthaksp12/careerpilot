export type ApplicationStatus =
  | "applied"
  | "reviewing"
  | "interview"
  | "offered"
  | "rejected";

export interface Application {
  id: number;
  job_id: number;
  resume_id: number;
  user_id: number;
  status: ApplicationStatus | string;
  created_at: string;
}

export interface ApplicationCreatePayload {
  job_id: number;
  resume_id: number;
}

export interface ApplicationUpdatePayload {
  status: string;
}
