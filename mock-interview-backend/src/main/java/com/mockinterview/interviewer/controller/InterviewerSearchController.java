package com.mockinterview.interviewer.controller;

import com.mockinterview.auth.entity.User;
import com.mockinterview.interviewer.dto.InterviewerProfileResponse;
import com.mockinterview.interviewer.service.InterviewerSearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class InterviewerSearchController {

    private final InterviewerSearchService searchService;

    @GetMapping("/api/v1/interviewers/search")
    @PreAuthorize("hasRole('CANDIDATE')")
    public ResponseEntity<List<InterviewerProfileResponse>> search(
            @AuthenticationPrincipal User currentUser,
            @RequestParam(required = false) Long companyId,
            @RequestParam(required = false) Long domainId) {
        return ResponseEntity.ok(searchService.search(currentUser, companyId, domainId));
    }
    @GetMapping("/api/v1/interviewers/{interviewerProfileId}")
    @PreAuthorize("hasRole('CANDIDATE')")
    public ResponseEntity<InterviewerProfileResponse> getById(@PathVariable Long interviewerProfileId) {
        return ResponseEntity.ok(searchService.getApprovedInterviewerById(interviewerProfileId));
    }
}