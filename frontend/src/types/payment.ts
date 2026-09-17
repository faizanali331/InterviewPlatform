export interface PaymentResponse {
  id: number;
  bookingId: number;
  amount: number;
  status: "PENDING" | "SUCCESS" | "FAILED";
  gatewayOrderId: string;
  gatewayPaymentId: string | null;
  razorpayKeyId: string;
  amountInPaise: number;
}

export interface ConfirmPaymentRequest {
  gatewayOrderId: string;
  gatewayPaymentId: string;
  gatewaySignature: string;
}