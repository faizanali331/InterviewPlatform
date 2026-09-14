package com.mockinterview.booking.service;

import com.mockinterview.auth.entity.User;
import com.mockinterview.booking.dto.BookingResponse;
import com.mockinterview.booking.dto.CreateBookingRequest;
import com.mockinterview.booking.entity.AvailabilitySlot;
import com.mockinterview.booking.entity.Booking;
import com.mockinterview.booking.repository.AvailabilitySlotRepository;
import com.mockinterview.booking.repository.BookingRepository;
import com.mockinterview.candidate.entity.CandidateProfile;
import com.mockinterview.candidate.repository.CandidateProfileRepository;
import com.mockinterview.catalog.entity.Domain;
import com.mockinterview.catalog.repository.DomainRepository;
import com.mockinterview.catalog.service.CatalogService;
import com.mockinterview.common.ResourceNotFoundException;
import com.mockinterview.interviewer.entity.InterviewerProfile;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final AvailabilitySlotRepository slotRepository;
    private final CandidateProfileRepository candidateProfileRepository;
    private final DomainRepository domainRepository;
    private final CatalogService catalogService;

    /**
     * White paper section 18. Note what's deliberately NOT here yet: payment.
     * A booking is CONFIRMED the instant it's created - there is no
     * PENDING_PAYMENT intermediate state, because nothing exists to move a
     * booking out of it. The Payment module will insert itself before the
     * CONFIRMED step and change that.
     */
    @Transactional
    public BookingResponse createBooking(User candidateUser, CreateBookingRequest request) {
        CandidateProfile candidateProfile = candidateProfileRepository.findByUserId(candidateUser.getId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Please set your current designation before booking an interview"));

        AvailabilitySlot slot = slotRepository.findById(request.getAvailabilitySlotId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Slot not found with id: " + request.getAvailabilitySlotId()));

        if (slot.isBooked()) {
            throw new IllegalStateException("This slot has already been booked");
        }

        InterviewerProfile interviewerProfile = slot.getInterviewerProfile();

        if (!"APPROVED".equals(interviewerProfile.getVerificationStatus())) {
            throw new IllegalStateException("This interviewer is not currently active");
        }

        // Section 12 - enforced here, server-side, not trusted from the frontend
        int candidateLevel = candidateProfile.getCurrentDesignation().getNormalizedLevel().getLevelNumber();
        int interviewerLevel = interviewerProfile.getDesignation().getNormalizedLevel().getLevelNumber();
        if (!catalogService.isEligible(candidateLevel, interviewerLevel)) {
            throw new IllegalStateException(
                    "This interviewer's level is not eligible to interview you");
        }

        Domain domain = domainRepository.findById(request.getDomainId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Domain not found with id: " + request.getDomainId()));

        // Section 14 - interviewer must actually cover the requested domain
        boolean interviewerCoversDomain = interviewerProfile.getDomains().stream()
                .anyMatch(d -> d.getId().equals(domain.getId()));
        if (!interviewerCoversDomain) {
            throw new IllegalStateException(
                    "This interviewer does not cover the requested domain");
        }

        slot.setBooked(true);
        slotRepository.save(slot);

        Booking booking = new Booking();
        booking.setCandidate(candidateUser);
        booking.setInterviewerProfile(interviewerProfile);
        booking.setAvailabilitySlot(slot);
        booking.setDomain(domain);
        booking.setStatus("CONFIRMED");

        try {
            return toResponse(bookingRepository.save(booking));
        } catch (DataIntegrityViolationException e) {
            // The uk_bookings_slot unique constraint caught a race: two
            // requests both passed the isBooked() check above before either
            // committed. This is the DB-level guarantee actually doing its job.
            throw new IllegalStateException("This slot was just booked by someone else. Please choose another.");
        }
    }

    @Transactional(readOnly = true)
    public List<BookingResponse> listMyBookingsAsCandidate(Long candidateUserId) {
        return bookingRepository.findAllByCandidateIdOrderByCreatedAtDesc(candidateUserId)
                .stream().map(this::toResponse).toList();
    }

    @Transactional(readOnly = true)
    public List<BookingResponse> listMyBookingsAsInterviewer(Long interviewerProfileId) {
        return bookingRepository.findAllByInterviewerProfileIdOrderByCreatedAtDesc(interviewerProfileId)
                .stream().map(this::toResponse).toList();
    }

    /**
     * Cancellation refund percentages (section 30) are a Payment-module
     * concern - this just flips status and frees the slot back up.
     */
    @Transactional
    public BookingResponse cancelBooking(User candidateUser, Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + bookingId));

        if (!booking.getCandidate().getId().equals(candidateUser.getId())) {
            throw new IllegalStateException("You can only cancel your own bookings");
        }
        if ("CANCELLED".equals(booking.getStatus())) {
            throw new IllegalStateException("This booking is already cancelled");
        }

        booking.setStatus("CANCELLED");
        booking.getAvailabilitySlot().setBooked(false);

        return toResponse(bookingRepository.save(booking));
    }

    private BookingResponse toResponse(Booking booking) {
        AvailabilitySlot slot = booking.getAvailabilitySlot();
        InterviewerProfile interviewerProfile = booking.getInterviewerProfile();

        return BookingResponse.builder()
                .id(booking.getId())
                .interviewerProfileId(interviewerProfile.getId())
                .interviewerCompanyName(interviewerProfile.getCompany() != null
                        ? interviewerProfile.getCompany().getName() : "Independent")
                .interviewerDesignationTitle(interviewerProfile.getDesignation().getTitle())
                .slotDate(slot.getSlotDate())
                .startTime(slot.getStartTime())
                .endTime(slot.getEndTime())
                .domainId(booking.getDomain().getId())
                .domainName(booking.getDomain().getName())
                .status(booking.getStatus())
                .build();
    }
}