package com.mockinterview.admin.service;

import com.mockinterview.admin.dto.AdminPaymentResponse;
import com.mockinterview.booking.entity.Booking;
import com.mockinterview.payment.entity.Payment;
import com.mockinterview.payment.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminPaymentService {

    private final PaymentRepository paymentRepository;

    @Transactional(readOnly = true)
    public List<AdminPaymentResponse> listAll() {
        return paymentRepository.findAll().stream()
                .sorted(Comparator.comparing(Payment::getCreatedAt).reversed())
                .map(this::toResponse)
                .toList();
    }

    private AdminPaymentResponse toResponse(Payment payment) {
        Booking booking = payment.getBooking();

        return AdminPaymentResponse.builder()
                .id(payment.getId())
                .bookingId(booking.getId())
                .candidateName(booking.getName())
                .candidateEmail(booking.getEmail())
                .mobile(booking.getMobile())
                .tier(booking.getTier())
                .companyName(booking.getCompany() != null ? booking.getCompany().getName() : null)
                .domainName(booking.getDomain() != null ? booking.getDomain().getName() : null)
                .amount(payment.getAmount())
                .status(payment.getStatus())
                .createdAt(payment.getCreatedAt())
                .build();
    }
}