// src/models/user.ts
export interface User {
  id?: number | null;
  password?: string | null;
  name: string;
  email: string;
  role?: string;
}
