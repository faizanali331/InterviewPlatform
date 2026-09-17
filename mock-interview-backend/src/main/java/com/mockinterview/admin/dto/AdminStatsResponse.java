package com.mockinterview.admin.dto;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Builder
public class AdminStatsResponse {
    private long totalCandidates;
    private long totalInterviewers;
    private long verifiedInterviewers;
    private long pendingInterviewers;

    private long totalBookings;
    private long confirmedBookings;
    private long cancelledBookings;
    private long pendingPaymentBookings;

    private BigDecimal totalRevenue;
    private List<DomainRevenue> revenueByDomain;

    @Getter
    @Builder
    public static class DomainRevenue {
        private String domainName;
        private BigDecimal amount;
    }
}