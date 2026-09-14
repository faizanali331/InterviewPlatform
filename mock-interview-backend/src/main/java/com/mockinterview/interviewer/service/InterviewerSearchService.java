package com.mockinterview.interviewer.service;

import com.mockinterview.auth.entity.User;
import com.mockinterview.candidate.entity.CandidateProfile;
import com.mockinterview.candidate.repository.CandidateProfileRepository;
import com.mockinterview.common.ResourceNotFoundException;
import com.mockinterview.interviewer.dto.InterviewerProfileResponse;
import com.mockinterview.interviewer.entity.InterviewerProfile;
import com.mockinterview.interviewer.repository.InterviewerProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.mockinterview.common.ResourceNotFoundException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InterviewerSearchService {

    private final InterviewerProfileRepository interviewerProfileRepository;
    private final CandidateProfileRepository candidateProfileRepository;
    private final InterviewerProfileService interviewerProfileService;

    /**
     * White paper section 15: candidate search returns eligible interviewers.
     * Section 12: eligibility is enforced server-side, never left to the
     * frontend - so this filters ineligible interviewers OUT entirely rather
     * than returning them with a flag for the UI to hide.
     */
    @Transactional(readOnly = true)
    public List<InterviewerProfileResponse> search(User candidateUser, Long companyId, Long domainId) {
        CandidateProfile candidateProfile = candidateProfileRepository.findByUserId(candidateUser.getId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Please set your current designation before browsing interviewers"));

        int candidateLevel = candidateProfile.getCurrentDesignation().getNormalizedLevel().getLevelNumber();

        List<InterviewerProfile> approved =
                interviewerProfileRepository.findAllByVerificationStatusOrderByCreatedAtAsc("APPROVED");

        return approved.stream()
                .filter(p -> p.getDesignation().getNormalizedLevel().getLevelNumber() > candidateLevel)
                .filter(p -> companyId == null || (p.getCompany() != null && p.getCompany().getId().equals(companyId)))
                .filter(p -> domainId == null || p.getDomains().stream().anyMatch(d -> d.getId().equals(domainId)))
                .map(interviewerProfileService::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public InterviewerProfileResponse getApprovedInterviewerById(Long interviewerProfileId) {
        InterviewerProfile profile = interviewerProfileRepository.findById(interviewerProfileId)
                .filter(p -> "APPROVED".equals(p.getVerificationStatus()))
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Interviewer not found or not currently active: " + interviewerProfileId));
        return interviewerProfileService.toResponse(profile);
    }
}