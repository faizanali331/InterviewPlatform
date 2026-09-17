package com.mockinterview.payment.gateway;

import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.UUID;

/**
 * Stands in for Razorpay/Stripe until a real gateway account exists.
 *
 * The "contains FAIL" convention below has no equivalent in a real gateway -
 * a real verifyPayment() checks a cryptographic signature server-side
 * (section 19), it never trusts a string the client sent. This exists
 * purely so the frontend payment screen can simulate both outcomes without
 * a live gateway. Delete this whole class (and this convention with it)
 * the day a real gateway is wired in.
 */

public class MockPaymentGateway implements PaymentGateway {

    @Override
    public String createOrder(Long bookingId, BigDecimal amount) {
        return "mock_order_" + UUID.randomUUID();
    }

    @Override
    public boolean verifyPayment(String gatewayOrderId, String gatewayPaymentId, String signature) {
        return gatewayPaymentId != null && !gatewayPaymentId.contains("FAIL");
    }
}