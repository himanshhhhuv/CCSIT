import { useUser } from "@clerk/nextjs";
import type { Role } from "@/types/auth";

export const useRole = () => {
  const { user } = useUser();
  const role = user?.publicMetadata?.role as Role;

  const isTeacher = role === "teacher";
  const isStudent = role === "student";

  return {
    role,
    isTeacher,
    isStudent,
  };
};
