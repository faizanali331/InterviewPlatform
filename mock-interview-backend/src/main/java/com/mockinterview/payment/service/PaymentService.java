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
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final BookingRepository bookingRepository;
    private final PaymentGateway paymentGateway;

    @Value("${razorpay.key-id}")
    private String razorpayKeyId;

    /** "Pay now" from My interviews: only the booking's own logged-in owner may retry. */
    @Transactional
    public PaymentResponse createOrder(User candidateUser, Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + bookingId));

        if (booking.getUser() == null || !booking.getUser().getId().equals(candidateUser.getId())) {
            throw new IllegalStateException("You can only pay for your own bookings");
        }
        return createOrderFor(booking);
    }

    /** Used by BookingService for new bookings (guests included). The amount is the booking's tier price. */
    @Transactional
    public PaymentResponse createOrderFor(Booking booking) {
        if (!"PENDING_PAYMENT".equals(booking.getStatus())) {
            throw new IllegalStateException("This booking is not awaiting payment. Status: " + booking.getStatus());
        }

        Payment payment = paymentRepository.findByBookingId(booking.getId()).orElseGet(Payment::new);

        if ("SUCCESS".equals(payment.getStatus())) {
            throw new IllegalStateException("This booking has already been paid for");
        }

        BigDecimal amount = booking.getAmount();
        String gatewayOrderId = paymentGateway.createOrder(booking.getId(), amount);

        payment.setBooking(booking);
        payment.setAmount(amount);
        payment.setStatus("PENDING");
        payment.setGatewayOrderId(gatewayOrderId);

        try {
            return toResponse(paymentRepository.save(payment));
        } catch (DataIntegrityViolationException e) {
            // Two near-simultaneous requests both tried to create the first payment row.
            Payment existing = paymentRepository.findByBookingId(booking.getId())
                    .orElseThrow(() -> new IllegalStateException("Could not create or retrieve payment order"));
            return toResponse(existing);
        }
    }

    /**
     * Public, because a guest has no login. The Razorpay signature check is what proves the
     * payment is real, so nobody can fake one from the browser.
     */
    @Transactional
    public PaymentResponse confirmPayment(ConfirmPaymentRequest request) {
        Payment payment = paymentRepository.findByGatewayOrderId(request.getGatewayOrderId())
                .orElseThrow(() -> new ResourceNotFoundException("Payment order not found"));

        if ("SUCCESS".equals(payment.getStatus())) {
            return toResponse(payment); // a double submit is harmless
        }

        Booking booking = payment.getBooking();
        boolean verified = paymentGateway.verifyPayment(
                request.getGatewayOrderId(), request.getGatewayPaymentId(), request.getGatewaySignature());
        payment.setGatewayPaymentId(request.getGatewayPaymentId());

        if (verified) {
            payment.setStatus("SUCCESS");
            if ("PENDING_PAYMENT".equals(booking.getStatus())) {
                booking.setStatus("CONFIRMED");
                booking.setPaidAt(LocalDateTime.now());
            }
        } else {
            payment.setStatus("FAILED"); // the booking stays PENDING_PAYMENT, so it can be retried
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
                .amountInPaise(payment.getAmount().multiply(BigDecimal.valueOf(100)).longValueExact())
                .build();
    }
}