package com.mockinterview.pricing.service;

import com.mockinterview.catalog.entity.Company;
import com.mockinterview.catalog.repository.CompanyRepository;
import com.mockinterview.pricing.dto.TierOptionResponse;
import com.mockinterview.pricing.entity.TierPrice;
import com.mockinterview.pricing.repository.TierPriceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PricingService {

    public static final String DEFAULT_TIER = "TIER_3";

    private final TierPriceRepository tierPriceRepository;
    private final CompanyRepository companyRepository;

    /** The three tiers with their prices and the companies in each. Public, for the booking form. */
    @Transactional(readOnly = true)
    public List<TierOptionResponse> listTierOptions() {
        Map<String, List<TierOptionResponse.CompanySummary>> byTier = new HashMap<>();

        for (Company company : companyRepository.findAllByActiveTrueOrderByNameAsc()) {
            byTier.computeIfAbsent(codeOf(company), key -> new ArrayList<>())
                    .add(TierOptionResponse.CompanySummary.builder()
                            .id(company.getId())
                            .name(company.getName())
                            .build());
        }

        return tierPriceRepository.findAllByOrderBySortOrderAsc().stream()
                .map(tier -> toOption(tier, byTier.getOrDefault(tier.getTier(), List.of())))
                .toList();
    }

    @Transactional(readOnly = true)
    public TierPrice requireTier(String code) {
        return tierPriceRepository.findById(code)
                .orElseThrow(() -> new IllegalArgumentException("Unknown tier: " + code));
    }

    /** The tier a company belongs to. A company with no tier counts as TIER_3. */
    @Transactional(readOnly = true)
    public TierPrice tierOf(Company company) {
        return requireTier(codeOf(company));
    }

    @Transactional
    public TierOptionResponse updatePrice(String tier, BigDecimal price) {
        TierPrice entity = requireTier(tier);
        entity.setPrice(price.setScale(2, RoundingMode.HALF_UP));
        return toOption(tierPriceRepository.save(entity), List.of());
    }

    private static String codeOf(Company company) {
        return (company == null || company.getTier() == null || company.getTier().isBlank())
                ? DEFAULT_TIER
                : company.getTier();
    }

    private TierOptionResponse toOption(TierPrice tier, List<TierOptionResponse.CompanySummary> companies) {
        return TierOptionResponse.builder()
                .tier(tier.getTier())
                .label(tier.getLabel())
                .description(tier.getDescription())
                .price(tier.getPrice())
                .sortOrder(tier.getSortOrder())
                .companies(companies)
                .build();
    }
}