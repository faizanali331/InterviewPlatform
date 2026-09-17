package com.mockinterview.payment.controller;

import com.mockinterview.auth.entity.User;
import com.mockinterview.payment.dto.ConfirmPaymentRequest;
import com.mockinterview.payment.dto.PaymentResponse;
import com.mockinterview.payment.service.PaymentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/bookings/{bookingId}/order")
    @PreAuthorize("hasRole('CANDIDATE')")
    public ResponseEntity<PaymentResponse> createOrder(
            @AuthenticationPrincipal User currentUser,
            @PathVariable Long bookingId) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(paymentService.createOrder(currentUser, bookingId));
    }

    @PostMapping("/confirm")
    @PreAuthorize("hasRole('CANDIDATE')")
    public ResponseEntity<PaymentResponse> confirmPayment(
            @AuthenticationPrincipal User currentUser,
            @Valid @RequestBody ConfirmPaymentRequest request) {
        return ResponseEntity.ok(paymentService.confirmPayment(currentUser, request));
    }
}