package com.mockinterview.booking.controller;

import com.mockinterview.auth.entity.User;
import com.mockinterview.booking.dto.BookingResponse;
import com.mockinterview.booking.dto.CreateBookingRequest;
import com.mockinterview.booking.dto.ScheduleBookingRequest;
import com.mockinterview.booking.service.BookingService;
import com.mockinterview.payment.dto.PaymentResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    /**
     * Public: works with or without a login. A logged-in candidate's booking is linked to their
     * account; a guest's is not. The reply is the payment order, ready for Razorpay.
     */
    @PostMapping("/api/v1/bookings")
    public ResponseEntity<PaymentResponse> create(
            Authentication authentication,
            @Valid @RequestBody CreateBookingRequest request) {
        User currentUser = (authentication != null && authentication.getPrincipal() instanceof User user)
                ? user
                : null;
        return ResponseEntity.status(HttpStatus.CREATED).body(bookingService.create(currentUser, request));
    }

    @GetMapping("/api/v1/bookings/me")
    @PreAuthorize("hasRole('CANDIDATE')")
    public ResponseEntity<List<BookingResponse>> mine(@AuthenticationPrincipal User currentUser) {
        return ResponseEntity.ok(bookingService.listMine(currentUser.getId()));
    }

    @PostMapping("/api/v1/bookings/{bookingId}/cancel")
    @PreAuthorize("hasRole('CANDIDATE')")
    public ResponseEntity<BookingResponse> cancel(
            @AuthenticationPrincipal User currentUser,
            @PathVariable Long bookingId) {
        return ResponseEntity.ok(bookingService.cancel(currentUser, bookingId));
    }

    // ---------------- admin ----------------

    @GetMapping("/api/v1/admin/bookings")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<List<BookingResponse>> listAll() {
        return ResponseEntity.ok(bookingService.listAll());
    }

    @PostMapping("/api/v1/admin/bookings/{bookingId}/schedule")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<BookingResponse> schedule(
            @PathVariable Long bookingId,
            @Valid @RequestBody ScheduleBookingRequest request) {
        return ResponseEntity.ok(bookingService.schedule(bookingId, request.getNote()));
    }
}