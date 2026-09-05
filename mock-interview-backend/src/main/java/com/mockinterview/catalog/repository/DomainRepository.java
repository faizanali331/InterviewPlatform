package com.mockinterview.catalog.repository;

import com.mockinterview.catalog.entity.Domain;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DomainRepository extends JpaRepository<Domain, Long> {
    List<Domain> findAllByActiveTrueOrderByCategoryAscNameAsc();
    List<Domain> findAllByCategoryAndActiveTrueOrderByNameAsc(String category);
}