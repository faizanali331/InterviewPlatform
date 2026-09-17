package com.mockinterview.payment.dto;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@Builder
public class PaymentResponse {
    private Long id;
    private Long bookingId;
    private BigDecimal amount;
    private String status; // PENDING, SUCCESS, FAILED
    private String gatewayOrderId;
    private String gatewayPaymentId;
    private String razorpayKeyId;
    private long amountInPaise;
}