package com.mockinterview.catalog.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateCompanyTierRequest {

    @NotBlank(message = "tier is required")
    @Pattern(regexp = "^TIER_[1-9]$", message = "Tier must look like TIER_1")
    private String tier;
}