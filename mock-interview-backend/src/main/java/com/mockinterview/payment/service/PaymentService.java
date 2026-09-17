package com.mockinterview.payment.service;

import com.mockinterview.auth.entity.User;
import com.mockinterview.booking.entity.Booking;
import com.mockinterview.booking.repository.BookingRepository;
import com.mockinterview.common.ResourceNotFoundException;
import com.mockinterview.payment.dto.ConfirmPaymentRequest;
import com.mockinterview.payment.dto.PaymentResponse;
import com.mockinterview.payment.entity.Payment;
import com.mockinterview.payment.gateway.PaymentGateway;
import com.mockinterview.payment.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class PaymentService {

    // Section 16 (pricing by level/duration/company) doesn't exist yet -
    // every booking costs the same flat fee until that module is built.
    private static final BigDecimal FLAT_FEE = new BigDecimal("999.00");

    private final PaymentRepository paymentRepository;
    private final BookingRepository bookingRepository;
    private final PaymentGateway paymentGateway;
    @Value("${razorpay.key-id}")
    private String razorpayKeyId;

    @Transactional
    public PaymentResponse createOrder(User candidateUser, Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + bookingId));

        if (!booking.getCandidate().getId().equals(candidateUser.getId())) {
            throw new IllegalStateException("You can only pay for your own bookings");
        }
        if (!"PENDING_PAYMENT".equals(booking.getStatus())) {
            throw new IllegalStateException("This booking is not awaiting payment. Status: " + booking.getStatus());
        }

        // Reuse an existing PENDING order if the candidate re-opens the payment
        // screen, rather than creating a second row against the same booking
        // (the unique constraint on booking_id would reject that anyway).
        Payment payment = paymentRepository.findByBookingId(bookingId).orElseGet(Payment::new);

        if ("SUCCESS".equals(payment.getStatus())) {
            throw new IllegalStateException("This booking has already been paid for");
        }

        String gatewayOrderId = paymentGateway.createOrder(bookingId, FLAT_FEE);

        payment.setBooking(booking);
        payment.setAmount(FLAT_FEE);
        payment.setStatus("PENDING");
        payment.setGatewayOrderId(gatewayOrderId);

        return toResponse(paymentRepository.save(payment));
    }

    /**
     * White paper section 19: this is the one place a booking is allowed to
     * move from PENDING_PAYMENT to CONFIRMED. A real gateway integration
     * would call this from a server-to-server webhook, not directly from the
     * candidate's browser - see the note on MockPaymentGateway.
     */
    @Transactional
    public PaymentResponse confirmPayment(User candidateUser, ConfirmPaymentRequest request) {
        Payment payment = paymentRepository.findByGatewayOrderId(request.getGatewayOrderId())
                .orElseThrow(() -> new ResourceNotFoundException("Payment order not found"));

        Booking booking = payment.getBooking();
        if (!booking.getCandidate().getId().equals(candidateUser.getId())) {
            throw new IllegalStateException("You can only confirm your own payments");
        }
        if (!"PENDING".equals(payment.getStatus())) {
            throw new IllegalStateException("This payment has already been processed");
        }

        boolean verified = paymentGateway.verifyPayment(request.getGatewayOrderId(), request.getGatewayPaymentId(), request.getGatewaySignature());
        payment.setGatewayPaymentId(request.getGatewayPaymentId());

        if (verified) {
            payment.setStatus("SUCCESS");
            booking.setStatus("CONFIRMED");
        } else {
            payment.setStatus("FAILED");
            // Booking deliberately stays PENDING_PAYMENT, not CANCELLED - the
            // slot stays reserved and the candidate can retry payment.
        }

        bookingRepository.save(booking);
        return toResponse(paymentRepository.save(payment));
    }

    private PaymentResponse toResponse(Payment payment) {
        return PaymentResponse.builder()
                .id(payment.getId())
                .bookingId(payment.getBooking().getId())
                .amount(payment.getAmount())
                .status(payment.getStatus())
                .gatewayOrderId(payment.getGatewayOrderId())
                .gatewayPaymentId(payment.getGatewayPaymentId())
                .razorpayKeyId(razorpayKeyId)
                .amountInPaise(payment.getAmount().multiply(java.math.BigDecimal.valueOf(100)).longValueExact())
                .build();
    }
}