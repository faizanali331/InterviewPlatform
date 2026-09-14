package com.mockinterview.booking.entity;

import com.mockinterview.auth.entity.User;
import com.mockinterview.catalog.entity.Domain;
import com.mockinterview.interviewer.entity.InterviewerProfile;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

/**
 * White paper section 18. Status is deliberately just CONFIRMED/CANCELLED/
 * COMPLETED for this phase - PENDING_PAYMENT does not exist yet because
 * nothing exists to move a booking out of it. The Payment module will add
 * that state and change confirmation to depend on it.
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

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "candidate_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_bookings_candidate"))
    private User candidate;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "interviewer_profile_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_bookings_interviewer"))
    private InterviewerProfile interviewerProfile;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "availability_slot_id", nullable = false, unique = true,
            foreignKey = @ForeignKey(name = "fk_bookings_slot"))
    private AvailabilitySlot availabilitySlot;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "domain_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_bookings_domain"))
    private Domain domain;

    @Column(nullable = false, length = 20)
    private String status = "CONFIRMED";

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}