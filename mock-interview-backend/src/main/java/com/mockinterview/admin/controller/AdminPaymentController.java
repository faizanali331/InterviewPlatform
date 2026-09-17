package com.mockinterview.admin.controller;

import com.mockinterview.admin.dto.AdminPaymentResponse;
import com.mockinterview.admin.service.AdminPaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class AdminPaymentController {

    private final AdminPaymentService paymentService;

    @GetMapping("/api/v1/admin/payments")
    @PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
    public ResponseEntity<List<AdminPaymentResponse>> listAll() {
        return ResponseEntity.ok(paymentService.listAll());
    }
}