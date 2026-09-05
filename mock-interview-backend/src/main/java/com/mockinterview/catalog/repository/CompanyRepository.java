package com.mockinterview.catalog.repository;

import com.mockinterview.catalog.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CompanyRepository extends JpaRepository<Company, Long> {
    List<Company> findAllByActiveTrueOrderByNameAsc();
    Optional<Company> findByNameIgnoreCase(String name);
    Optional<Company> findByEmailDomainIgnoreCase(String emailDomain);
    boolean existsByNameIgnoreCase(String name);
}