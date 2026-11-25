package com.mockinterview.pricing.repository;

import com.mockinterview.pricing.entity.TierPrice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TierPriceRepository extends JpaRepository<TierPrice, String> {
    List<TierPrice> findAllByOrderBySortOrderAsc();
}