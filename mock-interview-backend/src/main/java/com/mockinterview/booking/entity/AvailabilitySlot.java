package com.mockinterview.booking.entity;

import com.mockinterview.interviewer.entity.InterviewerProfile;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

/**
 * White paper section 17, simplified: rather than modeling recurring weekly
 * availability patterns and generating slots from them, an interviewer
 * directly creates concrete, one-off bookable slots. Recurring patterns can
 * be layered on top later without changing how booking consumes this table.
 */
@Entity
@Table(name = "availability_slots")
@Getter
@Setter
@NoArgsConstructor
public class AvailabilitySlot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "interviewer_profile_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_availability_slots_interviewer"))
    private InterviewerProfile interviewerProfile;

    @Column(name = "slot_date", nullable = false)
    private LocalDate slotDate;

    @Column(name = "start_time", nullable = false)
    private LocalTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalTime endTime;

    @Column(nullable = false)
    private boolean booked = false;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}