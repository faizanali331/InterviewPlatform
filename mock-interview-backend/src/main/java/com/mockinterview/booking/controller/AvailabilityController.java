package com.mockinterview.booking.controller;

import com.mockinterview.auth.entity.User;
import com.mockinterview.booking.dto.AvailabilitySlotResponse;
import com.mockinterview.booking.dto.CreateAvailabilitySlotRequest;
import com.mockinterview.booking.service.AvailabilityService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class AvailabilityController {

    private final AvailabilityService availabilityService;

    @PostMapping("/api/v1/interviewer/availability")
    @PreAuthorize("hasRole('INTERVIEWER')")
    public ResponseEntity<AvailabilitySlotResponse> createSlot(
            @AuthenticationPrincipal User currentUser,
            @Valid @RequestBody CreateAvailabilitySlotRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(availabilityService.createSlot(currentUser, request));
    }

    @GetMapping("/api/v1/interviewer/availability/me")
    @PreAuthorize("hasRole('INTERVIEWER')")
    public ResponseEntity<List<AvailabilitySlotResponse>> listMySlots(
            @AuthenticationPrincipal User currentUser) {
        return ResponseEntity.ok(availabilityService.listMySlots(currentUser.getId()));
    }

    @DeleteMapping("/api/v1/interviewer/availability/{slotId}")
    @PreAuthorize("hasRole('INTERVIEWER')")
    public ResponseEntity<Void> deleteSlot(
            @AuthenticationPrincipal User currentUser,
            @PathVariable Long slotId) {
        availabilityService.deleteSlot(currentUser, slotId);
        return ResponseEntity.noContent().build();
    }

    // Candidate-facing: view a specific interviewer's open slots before booking
    @GetMapping("/api/v1/interviewers/{interviewerProfileId}/availability")
    @PreAuthorize("hasRole('CANDIDATE')")
    public ResponseEntity<List<AvailabilitySlotResponse>> listOpenSlots(
            @PathVariable Long interviewerProfileId) {
        return ResponseEntity.ok(availabilityService.listOpenSlots(interviewerProfileId));
    }
}