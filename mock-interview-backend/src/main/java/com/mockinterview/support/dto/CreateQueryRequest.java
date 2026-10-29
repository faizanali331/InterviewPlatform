package com.mockinterview.support.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateQueryRequest {

    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 80, message = "Name must be 2 to 80 characters")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Enter a valid email")
    @Size(max = 255, message = "Email is too long")
    private String email;

    @NotBlank(message = "Phone is required")
    @Pattern(regexp = "^\\+?\\d{10,15}$", message = "Phone must have 10 to 15 digits")
    private String phone;

    @Size(max = 30, message = "Invalid visitor type")
    private String visitorType;

    @NotBlank(message = "Message is required")
    @Size(min = 10, max = 1000, message = "Message must be 10 to 1000 characters")
    private String message;
}