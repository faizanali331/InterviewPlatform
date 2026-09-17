package com.mockinterview.payment.gateway;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.math.BigDecimal;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.HashMap;
import java.util.HexFormat;
import java.util.Map;

@Component
public class RazorpayGateway implements PaymentGateway {

    private static final String ORDERS_URL = "https://api.razorpay.com/v1/orders";

    @Value("${razorpay.key-id}")
    private String keyId;

    @Value("${razorpay.key-secret}")
    private String keySecret;

    private final HttpClient httpClient = HttpClient.newHttpClient();
    private final ObjectMapper objectMapper = new ObjectMapper();

    @jakarta.annotation.PostConstruct
    public void logKeyStatus() {
        System.out.println("Razorpay key id loaded: " + (keyId != null && !keyId.isBlank() ? keyId : "EMPTY/MISSING"));
    }

    @Override
    public String createOrder(Long bookingId, BigDecimal amount) {
        try {
            long amountInPaise = amount.multiply(BigDecimal.valueOf(100)).longValueExact();

            Map<String, Object> body = new HashMap<>();
            body.put("amount", amountInPaise);
            body.put("currency", "INR");
            body.put("receipt", "booking_" + bookingId);
            body.put("payment_capture", 1);

            String auth = Base64.getEncoder()
                    .encodeToString((keyId + ":" + keySecret).getBytes(StandardCharsets.UTF_8));

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(ORDERS_URL))
                    .header("Authorization", "Basic " + auth)
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(objectMapper.writeValueAsString(body)))
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() != 200) {
                throw new IllegalStateException("Razorpay order creation failed: " + response.body());
            }

            JsonNode json = objectMapper.readTree(response.body());
            return json.get("id").asText(); // e.g. "order_NxyzABC123"

        } catch (Exception e) {
            throw new IllegalStateException("Could not create Razorpay order: " + e.getMessage(), e);
        }
    }

    /**
     * Razorpay's documented signature scheme: HMAC-SHA256 of
     * "{order_id}|{payment_id}" using the key secret, hex-encoded, compared
     * against the signature Razorpay's checkout returned to the browser.
     * This is what actually proves the payment is real - never trust the
     * order/payment ids alone.
     */
    @Override
    public boolean verifyPayment(String gatewayOrderId, String gatewayPaymentId, String signature) {
        try {
            String payload = gatewayOrderId + "|" + gatewayPaymentId;

            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(new SecretKeySpec(keySecret.getBytes(StandardCharsets.UTF_8), "HmacSHA256"));
            byte[] hash = mac.doFinal(payload.getBytes(StandardCharsets.UTF_8));
            String expectedSignature = HexFormat.of().formatHex(hash);

            return expectedSignature.equals(signature);
        } catch (Exception e) {
            return false;
        }
    }
}