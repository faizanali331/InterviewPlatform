export type Role = "candidate" | "interviewer" | "admin" | "super_admin";

export type AuthUser = {
  email: string;
  role: Role;
  token: string;
};

// Backend sends "ROLE_CANDIDATE" etc. This is the only place that mapping lives.
const BACKEND_ROLE_MAP: Record<string, Role> = {
  ROLE_CANDIDATE: "candidate",
  ROLE_INTERVIEWER: "interviewer",
  ROLE_ADMIN: "admin",
  ROLE_SUPER_ADMIN: "super_admin",
};

export function mapBackendRole(backendRole: string): Role {
  const role = BACKEND_ROLE_MAP[backendRole];
  if (!role) throw new Error(`Unknown role from backend: ${backendRole}`);
  return role;
}