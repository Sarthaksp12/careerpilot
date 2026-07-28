export interface Job {
  id?: number;

  job_id?: string;

  title: string;
  company: string;
  location: string | null;
  description: string;

  salary?: string | null;

  job_type?: string | null;
  employment_type?: string | null;

  experience_required?: number | null;

  apply_link?: string;
  logo?: string | null;

  created_at?: string;
}

export interface JobMatchResult {
  match_score?: number;
  matched_skills?: string[];
  missing_skills?: string[];
  strengths?: string[];
  suggestions?: string[];
  error?: string;
  raw_response?: string;
}

export interface JobFilters {
  search?: string;
  location?: string;
  job_type?: string;
}