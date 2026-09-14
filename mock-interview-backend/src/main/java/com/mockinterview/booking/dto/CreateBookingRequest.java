package com.mockinterview.booking.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateBookingRequest {

    @NotNull(message = "availabilitySlotId is required")
    private Long availabilitySlotId;

    @NotNull(message = "domainId is required")
    private Long domainId;
}