import { apiRequest } from "./apiClient";
import { Booking, CreateBookingRequest } from "../types/booking";

export async function createBooking(data: CreateBookingRequest): Promise<Booking> {
  return apiRequest("/bookings", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getMyBookingsAsCandidate(): Promise<Booking[]> {
  return apiRequest("/bookings/me");
}

export async function getMyBookingsAsInterviewer(): Promise<Booking[]> {
  return apiRequest("/bookings/interviewer/me");
}

export async function cancelBooking(bookingId: number): Promise<Booking> {
  return apiRequest(`/bookings/${bookingId}/cancel`, { method: "POST" });
}