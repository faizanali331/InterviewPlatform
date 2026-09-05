package com.mockinterview.catalog.repository;

import com.mockinterview.catalog.entity.Designation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DesignationRepository extends JpaRepository<Designation, Long> {
    List<Designation> findAllByActiveTrueOrderByTitleAsc();
    List<Designation> findAllByCompanyIdAndActiveTrueOrderByTitleAsc(Long companyId);
    List<Designation> findAllByCompanyIsNullAndActiveTrueOrderByTitleAsc();
}