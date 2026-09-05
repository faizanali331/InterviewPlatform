import { apiRequest } from "./apiClient";

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName?: string;
  phone?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  email: string;
  token: string;
  role: string; // raw backend value, e.g. "ROLE_CANDIDATE"
}

export async function registerUser(data: RegisterRequest) {
  return apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function registerInterviewer(data: RegisterRequest) {
  return apiRequest("/auth/register/interviewer", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function loginUser(data: LoginRequest): Promise<LoginResponse> {
  return apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}