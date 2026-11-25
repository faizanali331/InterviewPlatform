package com.mockinterview.admin.dto;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Builder
public class AdminPaymentResponse {
    private Long id;
    private Long bookingId;

    private String candidateName;
    private String candidateEmail;
    private String mobile;

    private String tier;
    private String companyName;
    private String domainName;

    private BigDecimal amount;
    private String status;
    private LocalDateTime createdAt;
}