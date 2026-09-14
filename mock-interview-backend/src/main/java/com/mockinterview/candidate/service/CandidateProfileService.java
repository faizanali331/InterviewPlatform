package com.mockinterview.candidate.service;

import com.mockinterview.auth.entity.User;
import com.mockinterview.candidate.dto.CandidateProfileResponse;
import com.mockinterview.candidate.dto.SetCandidateProfileRequest;
import com.mockinterview.candidate.entity.CandidateProfile;
import com.mockinterview.candidate.repository.CandidateProfileRepository;
import com.mockinterview.catalog.entity.Designation;
import com.mockinterview.catalog.repository.DesignationRepository;
import com.mockinterview.common.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CandidateProfileService {

    private final CandidateProfileRepository profileRepository;
    private final DesignationRepository designationRepository;

    // Unlike interviewer profiles, there's no verification lock here -
    // a candidate can update their own level freely at any time.
    @Transactional
    public CandidateProfileResponse setProfile(User currentUser, SetCandidateProfileRequest request) {
        Designation designation = designationRepository.findById(request.getDesignationId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Designation not found with id: " + request.getDesignationId()));

        CandidateProfile profile = profileRepository.findByUserId(currentUser.getId())
                .orElseGet(CandidateProfile::new);

        profile.setUser(currentUser);
        profile.setCurrentDesignation(designation);

        return toResponse(profileRepository.save(profile));
    }

    @Transactional(readOnly = true)
    public CandidateProfileResponse getMyProfile(Long userId) {
        CandidateProfile profile = profileRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Please set your current designation before browsing interviewers"));
        return toResponse(profile);
    }

    private CandidateProfileResponse toResponse(CandidateProfile profile) {
        Designation designation = profile.getCurrentDesignation();

        return CandidateProfileResponse.builder()
                .id(profile.getId())
                .userId(profile.getUser().getId())
                .designationId(designation.getId())
                .designationTitle(designation.getTitle())
                .levelNumber(designation.getNormalizedLevel().getLevelNumber())
                .levelName(designation.getNormalizedLevel().getLevelName())
                .build();
    }
}