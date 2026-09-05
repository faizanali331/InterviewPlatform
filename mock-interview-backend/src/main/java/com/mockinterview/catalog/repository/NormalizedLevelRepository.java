package com.mockinterview.catalog.repository;

import com.mockinterview.catalog.entity.NormalizedLevel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NormalizedLevelRepository extends JpaRepository<NormalizedLevel, Long> {
    List<NormalizedLevel> findAllByOrderByLevelNumberAsc();
    Optional<NormalizedLevel> findByLevelNumber(Integer levelNumber);
}