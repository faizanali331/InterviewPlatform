package com.mockinterview.config;

import com.mockinterview.auth.entity.Role;
import com.mockinterview.auth.repository.RoleRepository;
import com.mockinterview.catalog.entity.Company;
import com.mockinterview.catalog.entity.Designation;
import com.mockinterview.catalog.entity.Domain;
import com.mockinterview.catalog.entity.NormalizedLevel;
import com.mockinterview.catalog.repository.CompanyRepository;
import com.mockinterview.catalog.repository.DesignationRepository;
import com.mockinterview.catalog.repository.DomainRepository;
import com.mockinterview.catalog.repository.NormalizedLevelRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * Replaces the INSERT statements that used to live in the Flyway migrations.
 * Runs on every startup but is idempotent: it only inserts what's missing,
 * so restarting (or redeploying) never duplicates anything.
 */
@Component
@Order(1) // must run before SuperAdminSeeder, which needs ROLE_SUPER_ADMIN to exist
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataSeeder.class);

    private final RoleRepository roleRepository;
    private final NormalizedLevelRepository levelRepository;
    private final CompanyRepository companyRepository;
    private final DesignationRepository designationRepository;
    private final DomainRepository domainRepository;

    @Override
    @Transactional
    public void run(String... args) {
        seedRoles();
        seedLevels();
        seedCompanies();
        seedDesignations();
        seedDomains();
        log.info("Reference data check complete");
    }

    private void seedRoles() {
        for (String name : List.of("ROLE_CANDIDATE", "ROLE_INTERVIEWER", "ROLE_ADMIN", "ROLE_SUPER_ADMIN")) {
            if (roleRepository.findByName(name).isEmpty()) {
                roleRepository.save(new Role(name));
            }
        }
    }

    private void seedLevels() {
        if (levelRepository.count() > 0) return;

        List<String> names = List.of(
                "Junior", "Software Engineer", "Senior Software Engineer", "Lead / Staff",
                "Principal", "Engineering Manager", "Senior Engineering Manager", "Director");

        for (int i = 0; i < names.size(); i++) {
            NormalizedLevel level = new NormalizedLevel();
            level.setLevelNumber(i + 1);
            level.setLevelName(names.get(i));
            levelRepository.save(level);
        }
    }



    private void seedCompanies() {
        if (companyRepository.count() > 0) return;

        Map<String, String> companies = new LinkedHashMap<>();
        companies.put("Amazon", "amazon.com");
        companies.put("Microsoft", "microsoft.com");
        companies.put("Google", "google.com");
        companies.put("Cognizant", "cognizant.com");
        companies.put("Infosys", "infosys.com");
        companies.put("TCS", "tcs.com");
        companies.put("Accenture", "accenture.com");
        companies.put("Wipro", "wipro.com");
        companies.put("Capgemini", "capgemini.com");

        companies.forEach((name, emailDomain) -> {
            Company company = new Company();
            company.setName(name);
            company.setEmailDomain(emailDomain);
            companyRepository.save(company);
        });
    }

    private void seedDesignations() {
        if (designationRepository.count() > 0) return;

        // Generic titles (no company)
        saveDesignation("Fresher / Trainee", null, 1);
        saveDesignation("Software Engineer", null, 2);
        saveDesignation("Senior Software Engineer", null, 3);
        saveDesignation("Lead Engineer", null, 4);
        saveDesignation("Staff Engineer", null, 4);
        saveDesignation("Principal Engineer", null, 5);
        saveDesignation("Engineering Manager", null, 6);

        // Amazon-specific titles
        Company amazon = companyRepository.findByNameIgnoreCase("Amazon").orElse(null);
        if (amazon != null) {
            saveDesignation("SDE-1", amazon, 2);
            saveDesignation("SDE-2", amazon, 3);
            saveDesignation("SDE-3", amazon, 4);
            saveDesignation("Staff Engineer", amazon, 4);
            saveDesignation("Principal Engineer", amazon, 5);
        }
    }

    private void saveDesignation(String title, Company company, int levelNumber) {
        NormalizedLevel level = levelRepository.findByLevelNumber(levelNumber)
                .orElseThrow(() -> new IllegalStateException("Normalized level " + levelNumber + " is missing"));

        Designation designation = new Designation();
        designation.setTitle(title);
        designation.setCompany(company);
        designation.setNormalizedLevel(level);
        designationRepository.save(designation);
    }

    private void seedDomains() {
        if (domainRepository.count() > 0) return;

        Map<String, List<String>> domains = new LinkedHashMap<>();

        domains.put("Backend", List.of("Java", "Spring Boot", "Node.js", "Python", "REST API", "Microservices"));
        domains.put("Frontend", List.of("React", "Angular", "JavaScript", "TypeScript", "HTML/CSS"));
        domains.put("Blockchain", List.of("Solidity", "Ethereum", "Smart Contracts", "Web3", "DeFi"));
        domains.put("AI", List.of("Machine Learning", "Deep Learning", "Generative AI", "LLM"));
        domains.put("Cloud", List.of("AWS", "Azure", "GCP", "Docker", "Kubernetes", "DevOps"));
        domains.put("Data", List.of("SQL", "PostgreSQL", "MySQL", "Data Engineering"));
        domains.put("General", List.of("System Design", "Behavioral Interview", "Leadership", "Communication"));

        domains.forEach((category, names) -> names.forEach(name -> {
            Domain domain = new Domain();
            domain.setName(name);
            domain.setCategory(category);
            domainRepository.save(domain);
        }));
    }
}