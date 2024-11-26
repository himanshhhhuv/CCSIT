import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { Role } from "./types/auth";

// Public routes that don't require authentication
const publicRoutes = ["/sign-in(.*)", "/sign-up(.*)"];
const isPublicRoute = createRouteMatcher(publicRoutes);

// Role-based route patterns
const teacherRoutes = ["/teacher(.*)", "/admin(.*)"];
const studentRoutes = ["/student(.*)"];

const isTeacherRoute = createRouteMatcher(teacherRoutes);
const isStudentRoute = createRouteMatcher(studentRoutes);

export default clerkMiddleware(async (auth, request) => {
  if (isPublicRoute(request)) {
    return NextResponse.next();
  }

  const { userId, sessionClaims } = auth;
  
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  // Get user's role from session claims
  const role = sessionClaims?.role as Role;

  // Check role-based access
  if (isTeacherRoute(request) && role !== "teacher") {
    return new NextResponse("Forbidden: Teacher access required", { status: 403 });
  }

  if (isStudentRoute(request) && role !== "student") {
    return new NextResponse("Forbidden: Student access required", { status: 403 });
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
