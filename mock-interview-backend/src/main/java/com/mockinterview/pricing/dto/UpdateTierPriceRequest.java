package com.mockinterview.pricing.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class UpdateTierPriceRequest {

    @NotNull(message = "price is required")
    @DecimalMin(value = "1.00", message = "Price must be at least 1")
    @DecimalMax(value = "100000.00", message = "Price is too high")
    private BigDecimal price;
}