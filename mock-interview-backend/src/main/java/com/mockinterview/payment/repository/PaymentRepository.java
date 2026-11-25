package com.mockinterview.payment.repository;

import com.mockinterview.payment.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    Optional<Payment> findByBookingId(Long bookingId);
    Optional<Payment> findByGatewayOrderId(String gatewayOrderId);
    @Query("SELECT COALESCE(SUM(p.amount), 0) FROM Payment p WHERE p.status = 'SUCCESS'")
    java.math.BigDecimal sumSuccessfulAmount();

    @Query("SELECT COALESCE(d.name, 'Not specified'), COALESCE(SUM(p.amount), 0) " +
            "FROM Payment p JOIN p.booking b LEFT JOIN b.domain d " +
            "WHERE p.status = 'SUCCESS' GROUP BY d.name")
    List<Object[]> sumSuccessfulAmountByDomain();
}