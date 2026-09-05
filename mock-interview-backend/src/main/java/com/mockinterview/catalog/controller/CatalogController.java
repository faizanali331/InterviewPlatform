package com.mockinterview.catalog.controller;

import com.mockinterview.catalog.dto.*;
import com.mockinterview.catalog.service.CatalogService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/catalog")
@RequiredArgsConstructor
public class CatalogController {

    private final CatalogService catalogService;

    @GetMapping("/companies")
    public ResponseEntity<List<CompanyResponse>> getCompanies() {
        return ResponseEntity.ok(catalogService.getAllCompanies());
    }

    @GetMapping("/domains")
    public ResponseEntity<List<DomainResponse>> getDomains() {
        return ResponseEntity.ok(catalogService.getAllDomains());
    }

    @GetMapping("/levels")
    public ResponseEntity<List<LevelResponse>> getLevels() {
        return ResponseEntity.ok(catalogService.getAllLevels());
    }

    @GetMapping("/designations")
    public ResponseEntity<List<DesignationResponse>> getDesignations(
            @RequestParam(required = false) Long companyId) {
        return ResponseEntity.ok(catalogService.getDesignations(companyId));
    }

    @GetMapping("/eligibility")
    public ResponseEntity<EligibilityResponse> checkEligibility(
            @RequestParam Long candidateDesignationId,
            @RequestParam Long interviewerDesignationId) {
        return ResponseEntity.ok(
                catalogService.checkEligibility(candidateDesignationId, interviewerDesignationId)
        );
    }

    @PostMapping("/companies")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<CompanyResponse> createCompany(@Valid @RequestBody CreateCompanyRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(catalogService.createCompany(request));
    }

    @PostMapping("/domains")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<DomainResponse> createDomain(@Valid @RequestBody CreateDomainRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(catalogService.createDomain(request));
    }

    @PostMapping("/designations")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<DesignationResponse> createDesignation(@Valid @RequestBody CreateDesignationRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(catalogService.createDesignation(request));
    }
}