package com.mockinterview.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Deliberately kept to just account-level fields (email/password/name),
 * mirroring RegisterRequest. Professional details - company, designation,
 * years of experience, domains (white paper section 7) - are NOT collected
 * here. That's a separate "complete your interviewer profile" step owned by
 * the future interviewer module, not auth. Auth's only job is: does this
 * account exist, and what role/status does it start with.
 */
@Getter
@Setter
@NoArgsConstructor
public class InterviewerRegisterRequest {

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    @Size(max = 255, message = "Email cannot exceed 255 characters")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 8, max = 100, message = "Password must be between 8 and 100 characters")
    private String password;

    @NotBlank(message = "First name is required")
    @Size(max = 100, message = "First name cannot exceed 100 characters")
    private String firstName;

    @Size(max = 100, message = "Last name cannot exceed 100 characters")
    private String lastName;

    @Size(max = 20, message = "Phone cannot exceed 20 characters")
    private String phone;
}