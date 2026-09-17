import { apiRequest } from "./apiClient";
import { AdminStats, AdminPayment } from "../types/admin";

export async function getAdminStats(): Promise<AdminStats> {
  return apiRequest("/admin/stats");
}

export async function getAdminPayments(): Promise<AdminPayment[]> {
  return apiRequest("/admin/payments");
}