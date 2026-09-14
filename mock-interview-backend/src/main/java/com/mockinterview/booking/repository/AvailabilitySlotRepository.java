package com.mockinterview.booking.repository;

import com.mockinterview.booking.entity.AvailabilitySlot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AvailabilitySlotRepository extends JpaRepository<AvailabilitySlot, Long> {

    List<AvailabilitySlot> findAllByInterviewerProfileIdOrderBySlotDateAscStartTimeAsc(Long interviewerProfileId);

    List<AvailabilitySlot> findAllByInterviewerProfileIdAndBookedFalseOrderBySlotDateAscStartTimeAsc(Long interviewerProfileId);
}