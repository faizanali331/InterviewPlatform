package com.mockinterview.booking.dto;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Builder
public class BookingResponse {
    private Long id;
    private String name;
    private String mobile;
    private String email;
    private String tier;
    private String companyName;
    private String domainName;
    private String designation;
    private String experience;
    private String availability;
    private BigDecimal amount;
    private String status;
    private String scheduleNote;
    private boolean registered; // true when booked by a logged-in candidate
    private LocalDateTime createdAt;
    private LocalDateTime paidAt;
}