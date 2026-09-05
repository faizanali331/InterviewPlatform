export interface Company {
  id: number;
  name: string;
  emailDomain: string | null;
}

export interface Domain {
  id: number;
  name: string;
  category: string;
}

export interface Level {
  id: number;
  levelNumber: number;
  levelName: string;
}

export interface Designation {
  id: number;
  title: string;
  companyId: number | null;
  companyName: string | null;
  levelNumber: number;
  levelName: string;
}