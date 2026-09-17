package com.mockinterview.admin.service;

import com.mockinterview.admin.dto.AdminPaymentResponse;
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
        var booking = payment.getBooking();
        var interviewerProfile = booking.getInterviewerProfile();
        var candidate = booking.getCandidate();

        return AdminPaymentResponse.builder()
                .id(payment.getId())
                .bookingId(booking.getId())
                .candidateEmail(candidate.getEmail())
                .candidateName((candidate.getFirstName() + " " +
                        (candidate.getLastName() != null ? candidate.getLastName() : "")).trim())
                .interviewerCompanyName(interviewerProfile.getCompany() != null
                        ? interviewerProfile.getCompany().getName() : "Independent")
                .interviewerDesignationTitle(interviewerProfile.getDesignation().getTitle())
                .domainName(booking.getDomain().getName())
                .amount(payment.getAmount())
                .status(payment.getStatus())
                .createdAt(payment.getCreatedAt())
                .build();
    }
}