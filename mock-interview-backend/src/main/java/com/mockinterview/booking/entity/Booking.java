package com.mockinterview.booking.entity;

import com.mockinterview.auth.entity.User;
import com.mockinterview.catalog.entity.Company;
import com.mockinterview.catalog.entity.Domain;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * A paid request for a mock interview. There are no time slots and no interviewer is chosen here:
 * after payment the admin contacts the candidate and records the schedule in scheduleNote.
 * `user` is null for guests who booked from the landing page without an account.
 */
@Entity
@Table(name = "bookings")
@Getter
@Setter
@NoArgsConstructor
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", foreignKey = @ForeignKey(name = "fk_bookings_user"))
    private User user;

    @Column(length = 80)
    private String name;

    @Column(length = 255)
    private String email;

    @Column(nullable = false, length = 20)
    private String mobile;

    @Column(nullable = false, length = 20)
    private String tier; // TIER_1, TIER_2, TIER_3

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", foreignKey = @ForeignKey(name = "fk_bookings_company"))
    private Company company; // optional preferred company inside the tier

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "domain_id", foreignKey = @ForeignKey(name = "fk_bookings_domain"))
    private Domain domain;

    @Column(length = 100)
    private String designation;

    @Column(length = 20)
    private String experience; // FRESHER, YEARS_1_3, YEARS_3_5, YEARS_5_8, YEARS_8_PLUS

    @Column(length = 200)
    private String availability; // free text, e.g. "weekdays after 7 pm"

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;

    // PENDING_PAYMENT -> CONFIRMED (paid) -> SCHEDULED, or CANCELLED
    @Column(nullable = false, length = 20)
    private String status = "PENDING_PAYMENT";

    @Column(name = "schedule_note", length = 300)
    private String scheduleNote;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "paid_at")
    private LocalDateTime paidAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}