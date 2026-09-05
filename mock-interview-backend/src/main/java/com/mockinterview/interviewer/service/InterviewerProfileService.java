package com.mockinterview.interviewer.service;

import com.mockinterview.auth.entity.User;
import com.mockinterview.auth.repository.UserRepository;
import com.mockinterview.catalog.dto.DomainResponse;
import com.mockinterview.catalog.entity.Company;
import com.mockinterview.catalog.entity.Designation;
import com.mockinterview.catalog.entity.Domain;
import com.mockinterview.catalog.repository.CompanyRepository;
import com.mockinterview.catalog.repository.DesignationRepository;
import com.mockinterview.catalog.repository.DomainRepository;
import com.mockinterview.common.ResourceNotFoundException;
import com.mockinterview.interviewer.dto.InterviewerProfileResponse;
import com.mockinterview.interviewer.dto.SubmitInterviewerProfileRequest;
import com.mockinterview.interviewer.entity.InterviewerProfile;
import com.mockinterview.interviewer.repository.InterviewerProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class InterviewerProfileService {

    private final InterviewerProfileRepository profileRepository;
    private final CompanyRepository companyRepository;
    private final DesignationRepository designationRepository;
    private final DomainRepository domainRepository;
    private final UserRepository userRepository;

    /**
     * Creates the profile on first submission, or updates it on resubmission
     * after a rejection. Once APPROVED, the interviewer can no longer edit
     * their own profile - changing company/designation/domains post-verification
     * without a fresh admin review would undermine the whole point of section 8.
     */
    @Transactional
    public InterviewerProfileResponse submitProfile(User currentUser, SubmitInterviewerProfileRequest request) {
        InterviewerProfile profile = profileRepository.findByUserId(currentUser.getId())
                .orElseGet(InterviewerProfile::new);

        if ("APPROVED".equals(profile.getVerificationStatus())) {
            throw new IllegalStateException(
                    "Your profile is already approved and cannot be edited.");
        }

        Designation designation = designationRepository.findById(request.getDesignationId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Designation not found with id: " + request.getDesignationId()));

        Set<Domain> domains = new java.util.HashSet<>(domainRepository.findAllById(request.getDomainIds()));
        if (domains.size() != request.getDomainIds().size()) {
            throw new IllegalArgumentException("One or more domainIds do not exist");
        }

        profile.setUser(currentUser);
        profile.setDesignation(designation);
        profile.setYearsOfExperience(request.getYearsOfExperience());
        profile.setDomains(domains);
        profile.setVerificationStatus("PENDING"); // resubmission always resets to PENDING
        profile.setRejectionReason(null);

        if (request.getCompanyId() != null) {
            Company company = companyRepository.findById(request.getCompanyId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Company not found with id: " + request.getCompanyId()));
            profile.setCompany(company);
        } else {
            profile.setCompany(null);
        }

        return toResponse(profileRepository.save(profile));
    }

    @Transactional(readOnly = true)
    public InterviewerProfileResponse getMyProfile(Long userId) {
        InterviewerProfile profile = profileRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "You have not submitted an interviewer profile yet"));
        return toResponse(profile);
    }

    @Transactional(readOnly = true)
    public List<InterviewerProfileResponse> listByStatus(String status) {
        String normalized = (status != null) ? status : "PENDING";
        return profileRepository.findAllByVerificationStatusOrderByCreatedAtAsc(normalized).stream()
                .map(this::toResponse)
                .toList();
    }

    /**
     * White paper section 8, Stage 4. Flips both the profile status AND the
     * underlying User.status - this is the moment a PENDING_VERIFICATION
     * account becomes ACTIVE and can finally log in and be booked.
     */
    @Transactional
    public InterviewerProfileResponse approve(Long profileId) {
        InterviewerProfile profile = getProfileOrThrow(profileId);

        if ("APPROVED".equals(profile.getVerificationStatus())) {
            throw new IllegalStateException("This interviewer is already approved");
        }

        profile.setVerificationStatus("APPROVED");
        profile.setRejectionReason(null);

        User user = profile.getUser();
        user.setStatus("ACTIVE");
        userRepository.save(user);

        return toResponse(profileRepository.save(profile));
    }

    @Transactional
    public InterviewerProfileResponse reject(Long profileId, String reason) {
        InterviewerProfile profile = getProfileOrThrow(profileId);

        profile.setVerificationStatus("REJECTED");
        profile.setRejectionReason(reason);
        // Deliberately NOT touching User.status here - it stays PENDING_VERIFICATION,
        // so a rejected interviewer still cannot log in. They can resubmit via
        // submitProfile(), which resets status back to PENDING for another review.

        return toResponse(profileRepository.save(profile));
    }

    private InterviewerProfile getProfileOrThrow(Long profileId) {
        return profileRepository.findById(profileId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Interviewer profile not found with id: " + profileId));
    }

    private InterviewerProfileResponse toResponse(InterviewerProfile profile) {
        User user = profile.getUser();
        Company company = profile.getCompany();
        Designation designation = profile.getDesignation();

        List<DomainResponse> domainResponses = profile.getDomains().stream()
                .map(d -> DomainResponse.builder()
                        .id(d.getId())
                        .name(d.getName())
                        .category(d.getCategory())
                        .build())
                .toList();

        return InterviewerProfileResponse.builder()
                .id(profile.getId())
                .userId(user.getId())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .companyId(company != null ? company.getId() : null)
                .companyName(company != null ? company.getName() : null)
                .designationId(designation.getId())
                .designationTitle(designation.getTitle())
                .levelNumber(designation.getNormalizedLevel().getLevelNumber())
                .levelName(designation.getNormalizedLevel().getLevelName())
                .yearsOfExperience(profile.getYearsOfExperience())
                .domains(domainResponses)
                .verificationStatus(profile.getVerificationStatus())
                .rejectionReason(profile.getRejectionReason())
                .build();
    }
}