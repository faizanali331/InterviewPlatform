import { apiRequest } from "./apiClient";
import { CandidateProfile, SetCandidateProfileRequest } from "../types/candidate";

export async function setCandidateProfile(
  data: SetCandidateProfileRequest
): Promise<CandidateProfile> {
  return apiRequest("/candidate/profile", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getMyCandidateProfile(): Promise<CandidateProfile> {
  return apiRequest("/candidate/profile/me");
}