import { apiRequest } from "./apiClient";
import { AvailabilitySlot, CreateAvailabilitySlotRequest } from "../types/booking";

export async function createSlot(data: CreateAvailabilitySlotRequest): Promise<AvailabilitySlot> {
  return apiRequest("/interviewer/availability", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getMySlots(): Promise<AvailabilitySlot[]> {
  return apiRequest("/interviewer/availability/me");
}

export async function deleteSlot(slotId: number): Promise<null> {
  return apiRequest(`/interviewer/availability/${slotId}`, { method: "DELETE" });
}

export async function getOpenSlots(interviewerProfileId: number): Promise<AvailabilitySlot[]> {
  return apiRequest(`/interviewers/${interviewerProfileId}/availability`);
}