CREATE TABLE payments (
    id BIGINT NOT NULL AUTO_INCREMENT,

    booking_id BIGINT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',

    gateway_order_id VARCHAR(100),
    gateway_payment_id VARCHAR(100),

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    CONSTRAINT uk_payments_booking UNIQUE (booking_id),

    CONSTRAINT fk_payments_booking
        FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE
);

-- Existing bookings created before this migration were auto-CONFIRMED under
-- the old flow with no payment record. Leave them as-is; only new bookings
-- go through PENDING_PAYMENT from here on.