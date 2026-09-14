import { apiRequest } from "./apiClient";
import { InterviewerProfile, SubmitInterviewerProfileRequest } from "../types/interviewer";

// -------- Interviewer self-service --------

export async function submitInterviewerProfile(
  data: SubmitInterviewerProfileRequest
): Promise<InterviewerProfile> {
  return apiRequest("/interviewer/profile", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getMyInterviewerProfile(): Promise<InterviewerProfile> {
  return apiRequest("/interviewer/profile/me");
}

// -------- Admin verification --------

export async function listInterviewers(
  status?: "PENDING" | "APPROVED" | "REJECTED"
): Promise<InterviewerProfile[]> {
  const query = status ? `?status=${status}` : "";
  return apiRequest(`/admin/interviewers${query}`);
}

export async function approveInterviewer(profileId: number): Promise<InterviewerProfile> {
  return apiRequest(`/admin/interviewers/${profileId}/approve`, { method: "POST" });
}

export async function rejectInterviewer(
  profileId: number,
  reason: string
): Promise<InterviewerProfile> {
  return apiRequest(`/admin/interviewers/${profileId}/reject`, {
    method: "POST",
    body: JSON.stringify({ reason }),
  });
}
export async function searchInterviewers(
  companyId?: number,
  domainId?: number
): Promise<InterviewerProfile[]> {
  const params = new URLSearchParams();
  
  if (companyId) params.set("companyId", String(companyId));
  if (domainId) params.set("domainId", String(domainId));
  const query = params.toString() ? `?${params.toString()}` : "";
  
  return apiRequest(`/interviewers/search${query}`);
}
export async function getInterviewerById(interviewerProfileId: number): Promise<InterviewerProfile> {
  return apiRequest(`/interviewers/${interviewerProfileId}`);
}