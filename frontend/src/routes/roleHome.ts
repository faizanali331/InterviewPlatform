import { Role } from "../types/auth";

export function homeRouteForRole(role: Role): string {
  switch (role) {
    case "candidate":
      return "/dashboard";
    case "interviewer":
      return "/interviewer";
    case "admin":
    case "super_admin":
      return "/admin";
  }
}