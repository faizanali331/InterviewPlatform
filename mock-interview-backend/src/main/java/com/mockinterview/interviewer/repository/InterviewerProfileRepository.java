package com.mockinterview.interviewer.repository;

import com.mockinterview.interviewer.entity.InterviewerProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface InterviewerProfileRepository extends JpaRepository<InterviewerProfile, Long> {

    Optional<InterviewerProfile> findByUserId(Long userId);

    boolean existsByUserId(Long userId);

    List<InterviewerProfile> findAllByVerificationStatusOrderByCreatedAtAsc(String verificationStatus);
}