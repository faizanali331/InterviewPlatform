package com.mockinterview.booking.service;

import com.mockinterview.auth.entity.User;
import com.mockinterview.booking.dto.AvailabilitySlotResponse;
import com.mockinterview.booking.dto.CreateAvailabilitySlotRequest;
import com.mockinterview.booking.entity.AvailabilitySlot;
import com.mockinterview.booking.repository.AvailabilitySlotRepository;
import com.mockinterview.common.ResourceNotFoundException;
import com.mockinterview.interviewer.entity.InterviewerProfile;
import com.mockinterview.interviewer.repository.InterviewerProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AvailabilityService {

    private final AvailabilitySlotRepository slotRepository;
    private final InterviewerProfileRepository interviewerProfileRepository;

    @Transactional
    public AvailabilitySlotResponse createSlot(User interviewerUser, CreateAvailabilitySlotRequest request) {
        InterviewerProfile profile = getOwnApprovedProfile(interviewerUser.getId());

        if (!request.getStartTime().isBefore(request.getEndTime())) {
            throw new IllegalArgumentException("startTime must be before endTime");
        }

        AvailabilitySlot slot = new AvailabilitySlot();
        slot.setInterviewerProfile(profile);
        slot.setSlotDate(request.getSlotDate());
        slot.setStartTime(request.getStartTime());
        slot.setEndTime(request.getEndTime());

        return toResponse(slotRepository.save(slot));
    }

    @Transactional(readOnly = true)
    public List<AvailabilitySlotResponse> listMySlots(Long interviewerUserId) {
        InterviewerProfile profile = getOwnProfile(interviewerUserId);
        return slotRepository.findAllByInterviewerProfileIdOrderBySlotDateAscStartTimeAsc(profile.getId())
                .stream().map(this::toResponse).toList();
    }

    // Used by candidates browsing a specific interviewer's open slots (booking flow)
    @Transactional(readOnly = true)
    public List<AvailabilitySlotResponse> listOpenSlots(Long interviewerProfileId) {
        return slotRepository
                .findAllByInterviewerProfileIdAndBookedFalseOrderBySlotDateAscStartTimeAsc(interviewerProfileId)
                .stream().map(this::toResponse).toList();
    }

    @Transactional
    public void deleteSlot(User interviewerUser, Long slotId) {
        InterviewerProfile profile = getOwnProfile(interviewerUser.getId());

        AvailabilitySlot slot = slotRepository.findById(slotId)
                .orElseThrow(() -> new ResourceNotFoundException("Slot not found with id: " + slotId));

        if (!slot.getInterviewerProfile().getId().equals(profile.getId())) {
            throw new IllegalStateException("You can only delete your own availability slots");
        }
        if (slot.isBooked()) {
            throw new IllegalStateException("Cannot delete a slot that has already been booked");
        }

        slotRepository.delete(slot);
    }

    private InterviewerProfile getOwnProfile(Long userId) {
        return interviewerProfileRepository.findByUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "You have not submitted an interviewer profile yet"));
    }

    private InterviewerProfile getOwnApprovedProfile(Long userId) {
        InterviewerProfile profile = getOwnProfile(userId);
        if (!"APPROVED".equals(profile.getVerificationStatus())) {
            throw new IllegalStateException("Only approved interviewers can set availability");
        }
        return profile;
    }

    private AvailabilitySlotResponse toResponse(AvailabilitySlot slot) {
        return AvailabilitySlotResponse.builder()
                .id(slot.getId())
                .interviewerProfileId(slot.getInterviewerProfile().getId())
                .slotDate(slot.getSlotDate())
                .startTime(slot.getStartTime())
                .endTime(slot.getEndTime())
                .booked(slot.isBooked())
                .build();
    }
}