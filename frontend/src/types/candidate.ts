export interface CandidateProfile {
  id: number;
  userId: number;
  designationId: number;
  designationTitle: string;
  levelNumber: number;
  levelName: string;
}

export interface SetCandidateProfileRequest {
  designationId: number;
}