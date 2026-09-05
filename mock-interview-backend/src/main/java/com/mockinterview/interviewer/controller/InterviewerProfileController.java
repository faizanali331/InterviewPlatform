package com.mockinterview.interviewer.controller;

import com.mockinterview.auth.entity.User;
import com.mockinterview.interviewer.dto.InterviewerProfileResponse;
import com.mockinterview.interviewer.dto.RejectInterviewerRequest;
import com.mockinterview.interviewer.dto.SubmitInterviewerProfileRequest;
import com.mockinterview.interviewer.service.InterviewerProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class InterviewerProfileController {

    private final InterviewerProfileService profileService;

    // ============================================================
    // INTERVIEWER SELF-SERVICE
    // ============================================================

    @PostMapping("/api/v1/interviewer/profile")
    @PreAuthorize("hasRole('INTERVIEWER')")
    public ResponseEntity<InterviewerProfileResponse> submitProfile(
            @AuthenticationPrincipal User currentUser,
            @Valid @RequestBody SubmitInterviewerProfileRequest request) {
        return ResponseEntity.ok(profileService.submitProfile(currentUser, request));
    }

    @GetMapping("/api/v1/interviewer/profile/me")
    @PreAuthorize("hasRole('INTERVIEWER')")
    public ResponseEntity<InterviewerProfileResponse> getMyProfile(
            @AuthenticationPrincipal User currentUser) {
        return ResponseEntity.ok(profileService.getMyProfile(currentUser.getId()));
    }

    // ============================================================
    // ADMIN VERIFICATION (white paper section 8, Stage 4)
    // ============================================================

    @GetMapping("/api/v1/admin/interviewers")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<List<InterviewerProfileResponse>> listInterviewers(
            @RequestParam(required = false) String status) {
        return ResponseEntity.ok(profileService.listByStatus(status));
    }

    @PostMapping("/api/v1/admin/interviewers/{profileId}/approve")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<InterviewerProfileResponse> approve(@PathVariable Long profileId) {
        return ResponseEntity.ok(profileService.approve(profileId));
    }

    @PostMapping("/api/v1/admin/interviewers/{profileId}/reject")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<InterviewerProfileResponse> reject(
            @PathVariable Long profileId,
            @Valid @RequestBody RejectInterviewerRequest request) {
        return ResponseEntity.ok(profileService.reject(profileId, request.getReason()));
    }
}