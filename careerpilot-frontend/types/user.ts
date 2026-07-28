export interface User {
  id: number;
  name: string;
  email: string;
  clerk_user_id: string;
  created_at: string;
}

export interface UserUpdatePayload {
  name?: string;
  email?: string;
}
