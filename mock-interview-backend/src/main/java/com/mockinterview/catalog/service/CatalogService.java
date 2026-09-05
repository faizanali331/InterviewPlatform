package com.mockinterview.catalog.service;

import com.mockinterview.catalog.dto.*;
import com.mockinterview.catalog.entity.Company;
import com.mockinterview.catalog.entity.Designation;
import com.mockinterview.catalog.entity.Domain;
import com.mockinterview.catalog.entity.NormalizedLevel;
import com.mockinterview.catalog.repository.CompanyRepository;
import com.mockinterview.catalog.repository.DesignationRepository;
import com.mockinterview.catalog.repository.DomainRepository;
import com.mockinterview.catalog.repository.NormalizedLevelRepository;
import com.mockinterview.common.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CatalogService {

    private final CompanyRepository companyRepository;
    private final DesignationRepository designationRepository;
    private final DomainRepository domainRepository;
    private final NormalizedLevelRepository normalizedLevelRepository;

    @Transactional(readOnly = true)
    public List<CompanyResponse> getAllCompanies() {
        return companyRepository.findAllByActiveTrueOrderByNameAsc().stream()
                .map(this::toCompanyResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<DomainResponse> getAllDomains() {
        return domainRepository.findAllByActiveTrueOrderByCategoryAscNameAsc().stream()
                .map(this::toDomainResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<LevelResponse> getAllLevels() {
        return normalizedLevelRepository.findAllByOrderByLevelNumberAsc().stream()
                .map(this::toLevelResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<DesignationResponse> getDesignations(Long companyId) {
        if (companyId == null) {
            return designationRepository.findAllByActiveTrueOrderByTitleAsc().stream()
                    .map(this::toDesignationResponse)
                    .toList();
        }

        // Company-specific titles (e.g. Amazon's SDE-1/2/3) PLUS the generic,
        // company-agnostic titles (e.g. "Senior Software Engineer") - a company
        // with no titles of its own shouldn't leave the dropdown empty.
        List<Designation> companySpecific =
                designationRepository.findAllByCompanyIdAndActiveTrueOrderByTitleAsc(companyId);
        List<Designation> generic =
                designationRepository.findAllByCompanyIsNullAndActiveTrueOrderByTitleAsc();

        return java.util.stream.Stream.concat(companySpecific.stream(), generic.stream())
                .map(this::toDesignationResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public EligibilityResponse checkEligibility(Long candidateDesignationId, Long interviewerDesignationId) {
        int candidateLevel = getLevelNumberForDesignation(candidateDesignationId);
        int interviewerLevel = getLevelNumberForDesignation(interviewerDesignationId);

        return EligibilityResponse.builder()
                .candidateLevelNumber(candidateLevel)
                .interviewerLevelNumber(interviewerLevel)
                .eligible(isEligible(candidateLevel, interviewerLevel))
                .build();
    }

    public boolean isEligible(int candidateLevelNumber, int interviewerLevelNumber) {
        return interviewerLevelNumber > candidateLevelNumber;
    }

    private int getLevelNumberForDesignation(Long designationId) {
        Designation designation = designationRepository.findById(designationId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Designation not found with id: " + designationId));
        return designation.getNormalizedLevel().getLevelNumber();
    }

    @Transactional
    public CompanyResponse createCompany(CreateCompanyRequest request) {
        if (companyRepository.existsByNameIgnoreCase(request.getName())) {
            throw new IllegalArgumentException(
                    "A company named '" + request.getName() + "' already exists");
        }

        Company company = new Company();
        company.setName(request.getName());
        company.setEmailDomain(request.getEmailDomain());

        return toCompanyResponse(companyRepository.save(company));
    }

    @Transactional
    public DomainResponse createDomain(CreateDomainRequest request) {
        Domain domain = new Domain();
        domain.setName(request.getName());
        domain.setCategory(request.getCategory());

        return toDomainResponse(domainRepository.save(domain));
    }

    @Transactional
    public DesignationResponse createDesignation(CreateDesignationRequest request) {
        NormalizedLevel level = normalizedLevelRepository.findByLevelNumber(request.getLevelNumber())
                .orElseThrow(() -> new IllegalArgumentException(
                        "No normalized level exists with levelNumber: " + request.getLevelNumber()));

        Designation designation = new Designation();
        designation.setTitle(request.getTitle());
        designation.setNormalizedLevel(level);

        if (request.getCompanyId() != null) {
            Company company = companyRepository.findById(request.getCompanyId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Company not found with id: " + request.getCompanyId()));
            designation.setCompany(company);
        }

        return toDesignationResponse(designationRepository.save(designation));
    }

    private CompanyResponse toCompanyResponse(Company company) {
        return CompanyResponse.builder()
                .id(company.getId())
                .name(company.getName())
                .emailDomain(company.getEmailDomain())
                .build();
    }

    private DomainResponse toDomainResponse(Domain domain) {
        return DomainResponse.builder()
                .id(domain.getId())
                .name(domain.getName())
                .category(domain.getCategory())
                .build();
    }

    private LevelResponse toLevelResponse(NormalizedLevel level) {
        return LevelResponse.builder()
                .id(level.getId())
                .levelNumber(level.getLevelNumber())
                .levelName(level.getLevelName())
                .build();
    }

    private DesignationResponse toDesignationResponse(Designation designation) {
        Company company = designation.getCompany();

        return DesignationResponse.builder()
                .id(designation.getId())
                .title(designation.getTitle())
                .companyId(company != null ? company.getId() : null)
                .companyName(company != null ? company.getName() : null)
                .levelNumber(designation.getNormalizedLevel().getLevelNumber())
                .levelName(designation.getNormalizedLevel().getLevelName())
                .build();
    }
}