package com.mockinterview.pricing.dto;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Builder
public class TierOptionResponse {
    private String tier;
    private String label;
    private String description;
    private BigDecimal price;
    private int sortOrder;
    private List<CompanySummary> companies;

    @Getter
    @Builder
    public static class CompanySummary {
        private Long id;
        private String name;
    }
}