export type InterviewStatus =
  | "Upcoming"
  | "Completed"
  | "Cancelled";

export type Interview = {
  id: string;
  company: string;
  domain: string;
  role: string;
  date: string;
  time: string;
  status: InterviewStatus;
  score: number | null;
  amount: number;
};

export type InterviewSlot = {
  id: string;
  date: string;
  time: string;
  available: boolean;
};