export interface AvailabilitySlot {
  id: number;
  interviewerProfileId: number;
  slotDate: string;   // "2026-09-20"
  startTime: string;  // "10:00:00"
  endTime: string;    // "11:00:00"
  booked: boolean;
}

export interface CreateAvailabilitySlotRequest {
  slotDate: string;
  startTime: string;
  endTime: string;
}

export interface Booking {
  id: number;
  interviewerProfileId: number;
  interviewerCompanyName: string;
  interviewerDesignationTitle: string;
  slotDate: string;
  startTime: string;
  endTime: string;
  domainId: number;
  domainName: string;
  status: "CONFIRMED" | "CANCELLED";
}

export interface CreateBookingRequest {
  availabilitySlotId: number;
  domainId: number;
}