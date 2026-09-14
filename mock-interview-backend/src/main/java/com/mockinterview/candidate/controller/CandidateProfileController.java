package com.mockinterview.candidate.controller;

import com.mockinterview.auth.entity.User;
import com.mockinterview.candidate.dto.CandidateProfileResponse;
import com.mockinterview.candidate.dto.SetCandidateProfileRequest;
import com.mockinterview.candidate.service.CandidateProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/candidate/profile")
@RequiredArgsConstructor
public class CandidateProfileController {

    private final CandidateProfileService profileService;

    @PostMapping
    @PreAuthorize("hasRole('CANDIDATE')")
    public ResponseEntity<CandidateProfileResponse> setProfile(
            @AuthenticationPrincipal User currentUser,
            @Valid @RequestBody SetCandidateProfileRequest request) {
        return ResponseEntity.ok(profileService.setProfile(currentUser, request));
    }

    @GetMapping("/me")
    @PreAuthorize("hasRole('CANDIDATE')")
    public ResponseEntity<CandidateProfileResponse> getMyProfile(
            @AuthenticationPrincipal User currentUser) {
        return ResponseEntity.ok(profileService.getMyProfile(currentUser.getId()));
    }
}