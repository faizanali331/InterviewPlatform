package com.mockinterview.booking.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ScheduleBookingRequest {

    @NotBlank(message = "A schedule note is required")
    @Size(max = 300, message = "Note cannot exceed 300 characters")
    private String note;
}