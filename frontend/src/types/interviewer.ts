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