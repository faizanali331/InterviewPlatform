import { apiRequest } from "./apiClient";
import { PaymentResponse, ConfirmPaymentRequest } from "../types/payment";

export async function createPaymentOrder(bookingId: number): Promise<PaymentResponse> {
  return apiRequest(`/payments/bookings/${bookingId}/order`, { method: "POST" });
}

export async function confirmPayment(data: ConfirmPaymentRequest): Promise<PaymentResponse> {
  return apiRequest("/payments/confirm", {
    method: "POST",
    body: JSON.stringify(data),
  });
}