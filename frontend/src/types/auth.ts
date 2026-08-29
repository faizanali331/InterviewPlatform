export type Role =
  | "candidate"
  | "interviewer"
  | "admin";

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
};
