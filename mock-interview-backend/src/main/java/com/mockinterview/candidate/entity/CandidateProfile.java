package com.mockinterview.candidate.entity;

import com.mockinterview.auth.entity.User;
import com.mockinterview.catalog.entity.Designation;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

/**
 * White paper section 10/11: a candidate's current designation determines
 * their normalized level, which section 12's eligibility rule compares
 * against an interviewer's level. Deliberately minimal for this phase -
 * target designation, skills, resume (also in section 10) are left out
 * until something actually needs them.
 */
@Entity
@Table(name = "candidate_profiles")
@Getter
@Setter
@NoArgsConstructor
public class CandidateProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false, unique = true,
            foreignKey = @ForeignKey(name = "fk_candidate_profiles_user"))
    private User user;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "current_designation_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_candidate_profiles_designation"))
    private Designation currentDesignation;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        LocalDateTime now = LocalDateTime.now();
        createdAt = now;
        updatedAt = now;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}