package com.mockinterview.admin.service;

import com.mockinterview.admin.dto.AdminStatsResponse;
import com.mockinterview.auth.repository.UserRepository;
import com.mockinterview.booking.repository.BookingRepository;
import com.mockinterview.interviewer.repository.InterviewerProfileRepository;
import com.mockinterview.payment.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminStatsService {

    private final UserRepository userRepository;
    private final InterviewerProfileRepository interviewerProfileRepository;
    private final BookingRepository bookingRepository;
    private final PaymentRepository paymentRepository;

    @Transactional(readOnly = true)
    public AdminStatsResponse getStats() {
        List<Object[]> rawRevenueByDomain = paymentRepository.sumSuccessfulAmountByDomain();
        List<AdminStatsResponse.DomainRevenue> revenueByDomain = rawRevenueByDomain.stream()
                .map(row -> AdminStatsResponse.DomainRevenue.builder()
                        .domainName((String) row[0])
                        .amount((BigDecimal) row[1])
                        .build())
                .toList();

        return AdminStatsResponse.builder()
                .totalCandidates(userRepository.countByRole_Name("ROLE_CANDIDATE"))
                .totalInterviewers(userRepository.countByRole_Name("ROLE_INTERVIEWER"))
                .verifiedInterviewers(interviewerProfileRepository.countByVerificationStatus("APPROVED"))
                .pendingInterviewers(interviewerProfileRepository.countByVerificationStatus("PENDING"))
                .totalBookings(bookingRepository.count())
                .confirmedBookings(bookingRepository.countByStatus("CONFIRMED"))
                .cancelledBookings(bookingRepository.countByStatus("CANCELLED"))
                .pendingPaymentBookings(bookingRepository.countByStatus("PENDING_PAYMENT"))
                .totalRevenue(paymentRepository.sumSuccessfulAmount())
                .revenueByDomain(revenueByDomain)
                .build();
    }
}