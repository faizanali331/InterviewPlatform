package com.mockinterview.interviewer.entity;

import com.mockinterview.auth.entity.User;
import com.mockinterview.catalog.entity.Company;
import com.mockinterview.catalog.entity.Designation;
import com.mockinterview.catalog.entity.Domain;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

/**
 * White paper section 7 (registration) + section 8 (verification).
 * One row per interviewer User - the OneToOne + unique constraint on
 * user_id is what enforces "one profile per account" at the DB level,
 * not just in application code.
 */
@Entity
@Table(name = "interviewer_profiles")
@Getter
@Setter
@NoArgsConstructor
public class InterviewerProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false, unique = true,
            foreignKey = @ForeignKey(name = "fk_interviewer_profiles_user"))
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id",
            foreignKey = @ForeignKey(name = "fk_interviewer_profiles_company"))
    private Company company;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "designation_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_interviewer_profiles_designation"))
    private Designation designation;

    @Column(name = "years_of_experience", nullable = false)
    private Integer yearsOfExperience;

    // Section 14: the domains this interviewer is qualified to interview in
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "interviewer_profile_domains",
            joinColumns = @JoinColumn(name = "interviewer_profile_id"),
            inverseJoinColumns = @JoinColumn(name = "domain_id")
    )
    private Set<Domain> domains = new HashSet<>();

    // Section 8 stages, simplified to what this phase actually implements
    @Column(name = "verification_status", nullable = false, length = 30)
    private String verificationStatus = "PENDING";

    @Column(name = "rejection_reason", length = 500)
    private String rejectionReason;

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