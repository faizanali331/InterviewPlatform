package com.mockinterview.booking.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Builder
public class AvailabilitySlotResponse {
    private Long id;
    private Long interviewerProfileId;
    private LocalDate slotDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private boolean booked;
}