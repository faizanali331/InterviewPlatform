import { apiRequest } from "./apiClient";
import { Company, Domain, Level, Designation } from "../types/catalog";

export async function getCompanies(): Promise<Company[]> {
  return apiRequest("/catalog/companies");
}

export async function getDomains(): Promise<Domain[]> {
  return apiRequest("/catalog/domains");
}

export async function getLevels(): Promise<Level[]> {
  return apiRequest("/catalog/levels");
}

export async function getDesignations(companyId?: number): Promise<Designation[]> {
  const query = companyId ? `?companyId=${companyId}` : "";
  return apiRequest(`/catalog/designations${query}`);
}