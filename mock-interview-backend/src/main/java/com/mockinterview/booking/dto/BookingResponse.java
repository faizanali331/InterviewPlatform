package com.mockinterview.booking.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Builder
public class BookingResponse {
    private Long id;

    private Long interviewerProfileId;
    private String interviewerCompanyName;
    private String interviewerDesignationTitle;

    private LocalDate slotDate;
    private LocalTime startTime;
    private LocalTime endTime;

    private Long domainId;
    private String domainName;

    private String status;
}