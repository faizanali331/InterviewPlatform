package com.mockinterview.pricing.controller;

import com.mockinterview.pricing.dto.TierOptionResponse;
import com.mockinterview.pricing.dto.UpdateTierPriceRequest;
import com.mockinterview.pricing.service.PricingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class PricingController {

    private final PricingService pricingService;

    // Public: your existing rule already permits GET /api/v1/catalog/**
    @GetMapping("/api/v1/catalog/tiers")
    public ResponseEntity<List<TierOptionResponse>> tiers() {
        return ResponseEntity.ok(pricingService.listTierOptions());
    }

    @PutMapping("/api/v1/admin/tier-prices/{tier}")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<TierOptionResponse> update(
            @PathVariable String tier,
            @Valid @RequestBody UpdateTierPriceRequest request) {
        return ResponseEntity.ok(pricingService.updatePrice(tier, request.getPrice()));
    }
}