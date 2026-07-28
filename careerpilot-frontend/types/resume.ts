export interface Resume {
  id: number;
  title: string;
  file_name: string;
  file_path: string;
  extracted_text: string | null;
  skills: string | null;
  experience: string | null;
  education: string | null;
  user_id: number;
  created_at: string;
}

export interface ResumeUploadResponse {
  message: string;
  resume_id: number;
  filename: string;
  analysis: ATSAnalysis;
}

export interface ATSAnalysis {
  full_name?: string;
  email?: string;
  phone?: string;
  summary?: string;
  skills?: string[];
  experience?: unknown[];
  education?: unknown[];
  projects?: unknown[];
  certifications?: unknown[];
  languages?: unknown[];
  ats_score?: number;
  strengths?: string[];
  weaknesses?: string[];
  missing_keywords?: string[];
  suggestions?: string[];
}
