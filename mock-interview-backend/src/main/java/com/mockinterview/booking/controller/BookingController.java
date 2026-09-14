package com.mockinterview.booking.controller;

import com.mockinterview.auth.entity.User;
import com.mockinterview.booking.dto.BookingResponse;
import com.mockinterview.booking.dto.CreateBookingRequest;
import com.mockinterview.booking.service.BookingService;
import com.mockinterview.common.ResourceNotFoundException;
import com.mockinterview.interviewer.repository.InterviewerProfileRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;
    private final InterviewerProfileRepository interviewerProfileRepository;

    @PostMapping
    @PreAuthorize("hasRole('CANDIDATE')")
    public ResponseEntity<BookingResponse> createBooking(
            @AuthenticationPrincipal User currentUser,
            @Valid @RequestBody CreateBookingRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(bookingService.createBooking(currentUser, request));
    }

    @GetMapping("/me")
    @PreAuthorize("hasRole('CANDIDATE')")
    public ResponseEntity<List<BookingResponse>> myBookings(@AuthenticationPrincipal User currentUser) {
        return ResponseEntity.ok(bookingService.listMyBookingsAsCandidate(currentUser.getId()));
    }

    @PostMapping("/{bookingId}/cancel")
    @PreAuthorize("hasRole('CANDIDATE')")
    public ResponseEntity<BookingResponse> cancelBooking(
            @AuthenticationPrincipal User currentUser,
            @PathVariable Long bookingId) {
        return ResponseEntity.ok(bookingService.cancelBooking(currentUser, bookingId));
    }

    @GetMapping("/interviewer/me")
    @PreAuthorize("hasRole('INTERVIEWER')")
    public ResponseEntity<List<BookingResponse>> myBookingsAsInterviewer(
            @AuthenticationPrincipal User currentUser) {
        Long profileId = interviewerProfileRepository.findByUserId(currentUser.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Interviewer profile not found"))
                .getId();
        return ResponseEntity.ok(bookingService.listMyBookingsAsInterviewer(profileId));
    }
}