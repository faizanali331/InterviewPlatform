export interface DomainRevenue {
  domainName: string;
  amount: number;
}

export interface AdminStats {
  totalCandidates: number;
  totalInterviewers: number;
  verifiedInterviewers: number;
  pendingInterviewers: number;

  totalBookings: number;
  confirmedBookings: number;
  cancelledBookings: number;
  pendingPaymentBookings: number;

  totalRevenue: number;
  revenueByDomain: DomainRevenue[];
}

export interface AdminPayment {
  id: number;
  bookingId: number;
  candidateEmail: string;
  candidateName: string;
  interviewerCompanyName: string;
  interviewerDesignationTitle: string;
  domainName: string;
  amount: number;
  status: "PENDING" | "SUCCESS" | "FAILED";
  createdAt: string;
}