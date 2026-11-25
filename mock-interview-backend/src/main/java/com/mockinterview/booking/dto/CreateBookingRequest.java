package com.mockinterview.booking.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateBookingRequest {

    // Mandatory: so we can reach the candidate.
    @NotBlank(message = "Mobile number is required")
    @Pattern(regexp = "^\\+?\\d{10,15}$", message = "Mobile must have 10 to 15 digits")
    private String mobile;

    // Mandatory: it decides the price.
    @NotBlank(message = "Choose a company tier")
    @Pattern(regexp = "^TIER_[1-9]$", message = "Invalid tier")
    private String tier;

    private Long companyId;
    private Long domainId;

    @Size(max = 80, message = "Name is too long")
    private String name;

    @Email(message = "Enter a valid email")
    @Size(max = 255, message = "Email is too long")
    private String email;

    @Size(max = 100, message = "Designation is too long")
    private String designation;

    @Pattern(regexp = "^(FRESHER|YEARS_1_3|YEARS_3_5|YEARS_5_8|YEARS_8_PLUS)$",
            message = "Invalid experience")
    private String experience;

    @Size(max = 200, message = "Availability is too long")
    private String availability;
}