package com.mockinterview.catalog.dto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateDomainRequest {
    @NotBlank(message = "Domain name is required")
    @Size(max = 100, message = "Domain name cannot exceed 100 characters")
    private String name;

    @NotBlank(message = "Category is required")
    @Size(max = 50, message = "Category cannot exceed 50 characters")
    private String category;
}
