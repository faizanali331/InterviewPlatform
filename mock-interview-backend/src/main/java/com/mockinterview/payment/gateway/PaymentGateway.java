package com.mockinterview.payment.gateway;

import java.math.BigDecimal;

/**
 * White paper section 19/21 pattern: keep the provider abstract so a real
 * one (Razorpay, Stripe) can be swapped in later without touching
 * PaymentService or the controller - only a new implementation of this
 * interface, wired in as the @Component instead of MockPaymentGateway.
 */
public interface PaymentGateway {

    String createOrder(Long bookingId, BigDecimal amount);

    boolean verifyPayment(String gatewayOrderId, String gatewayPaymentId, String signature);
}