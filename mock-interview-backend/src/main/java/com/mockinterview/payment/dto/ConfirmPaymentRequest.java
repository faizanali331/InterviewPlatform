package com.mockinterview.payment.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ConfirmPaymentRequest {

    @NotBlank(message = "gatewayOrderId is required")
    private String gatewayOrderId;

    @NotBlank(message = "gatewayPaymentId is required")
    private String gatewayPaymentId;

    @NotBlank(message = "gatewaySignature is required")
    private String gatewaySignature;
}