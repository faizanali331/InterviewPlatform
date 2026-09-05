package com.mockinterview.catalog.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateCompanyRequest {

    @NotBlank(message = "Company name is required")
    @Size(max = 150, message = "Company name cannot exceed 150 characters")
    private String name;

    @Size(max = 150, message = "Email domain cannot exceed 150 characters")
    private String emailDomain;
}