export type Role = 'student' | 'teacher';

export interface UserRole {
  role: Role;
  userId: string;
}
