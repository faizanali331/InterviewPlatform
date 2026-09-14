import { Domain } from "./catalog";

export type VerificationStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface InterviewerProfile {
  id: number;
  userId: number;
  email: string;
  firstName: string;
  lastName: string | null;

  companyId: number | null;
  companyName: string | null;

  designationId: number;
  designationTitle: string;
  levelNumber: number;
  levelName: string;

  yearsOfExperience: number;
  domains: Domain[];

  verificationStatus: VerificationStatus;
  rejectionReason: string | null;
}

export interface SubmitInterviewerProfileRequest {
  companyId?: number | null;
  designationId: number;
  yearsOfExperience: number;
  domainIds: number[];
}
export type Interviewer = {
  id: string;
  company: string;
  designation: string;
  experience: number;
  domain: string;
  skills: string[];
  rating: number;
  price: number;
  slots: string[];
  verified?: boolean;
};