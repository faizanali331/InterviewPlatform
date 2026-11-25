package com.mockinterview.booking.service;

import com.mockinterview.auth.entity.User;
import com.mockinterview.booking.dto.BookingResponse;
import com.mockinterview.booking.dto.CreateBookingRequest;
import com.mockinterview.booking.entity.Booking;
import com.mockinterview.booking.repository.BookingRepository;
import com.mockinterview.catalog.entity.Company;
import com.mockinterview.catalog.repository.CompanyRepository;
import com.mockinterview.catalog.repository.DomainRepository;
import com.mockinterview.common.ResourceNotFoundException;
import com.mockinterview.payment.dto.PaymentResponse;
import com.mockinterview.payment.service.PaymentService;
import com.mockinterview.pricing.entity.TierPrice;
import com.mockinterview.pricing.service.PricingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final CompanyRepository companyRepository;
    private final DomainRepository domainRepository;
    private final PricingService pricingService;
    private final PaymentService paymentService;

    /**
     * Creates the booking and its payment order in one transaction. There is deliberately no
     * interviewer or time-slot check: the booking is just a paid request. If the payment gateway
     * fails, the whole thing rolls back, so no orphan booking is left behind.
     * `currentUser` is null for guests.
     */
    @Transactional
    public PaymentResponse create(User currentUser, CreateBookingRequest request) {
        TierPrice tier = pricingService.requireTier(request.getTier());

        Booking booking = new Booking();
        booking.setUser(currentUser);
        booking.setMobile(request.getMobile());
        booking.setName(firstNonBlank(request.getName(), currentUser != null ? fullName(currentUser) : null));
        booking.setEmail(firstNonBlank(request.getEmail(), currentUser != null ? currentUser.getEmail() : null));
        booking.setTier(tier.getTier());
        booking.setAmount(tier.getPrice()); // the price comes from the tier, never from the browser
        booking.setDesignation(blankToNull(request.getDesignation()));
        booking.setExperience(blankToNull(request.getExperience()));
        booking.setAvailability(blankToNull(request.getAvailability()));

        if (request.getCompanyId() != null) {
            Company company = companyRepository.findById(request.getCompanyId())
                    .filter(Company::isActive)
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Company not found with id: " + request.getCompanyId()));

            if (!tier.getTier().equals(pricingService.tierOf(company).getTier())) {
                throw new IllegalArgumentException("That company is not in the selected tier");
            }
            booking.setCompany(company);
        }

        if (request.getDomainId() != null) {
            booking.setDomain(domainRepository.findById(request.getDomainId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Domain not found with id: " + request.getDomainId())));
        }

        Booking saved = bookingRepository.save(booking);
        return paymentService.createOrderFor(saved);
    }

    @Transactional(readOnly = true)
    public List<BookingResponse> listMine(Long userId) {
        return bookingRepository.findAllByUserIdOrderByCreatedAtDesc(userId).stream()
                .map(this::toResponse)
                .toList();
    }

    /** Cancelling does not refund money. Refunds are handled by hand in the Razorpay dashboard. */
    @Transactional
    public BookingResponse cancel(User user, Long bookingId) {
        Booking booking = find(bookingId);

        if (booking.getUser() == null || !booking.getUser().getId().equals(user.getId())) {
            throw new IllegalStateException("You can only cancel your own bookings");
        }
        if (!"PENDING_PAYMENT".equals(booking.getStatus()) && !"CONFIRMED".equals(booking.getStatus())) {
            throw new IllegalStateException("This booking can't be cancelled. Status: " + booking.getStatus());
        }

        booking.setStatus("CANCELLED");
        return toResponse(bookingRepository.save(booking));
    }

    // ---------------- admin ----------------

    @Transactional(readOnly = true)
    public List<BookingResponse> listAll() {
        return bookingRepository.findAllByOrderByCreatedAtDesc().stream().map(this::toResponse).toList();
    }

    @Transactional
    public BookingResponse schedule(Long bookingId, String note) {
        Booking booking = find(bookingId);

        if (!"CONFIRMED".equals(booking.getStatus())) {
            throw new IllegalStateException("Only paid bookings can be scheduled. Status: " + booking.getStatus());
        }

        booking.setStatus("SCHEDULED");
        booking.setScheduleNote(note.trim());
        return toResponse(bookingRepository.save(booking));
    }

    // ---------------- helpers ----------------

    private Booking find(Long id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + id));
    }

    private BookingResponse toResponse(Booking b) {
        return BookingResponse.builder()
                .id(b.getId())
                .name(b.getName())
                .mobile(b.getMobile())
                .email(b.getEmail())
                .tier(b.getTier())
                .companyName(b.getCompany() != null ? b.getCompany().getName() : null)
                .domainName(b.getDomain() != null ? b.getDomain().getName() : null)
                .designation(b.getDesignation())
                .experience(b.getExperience())
                .availability(b.getAvailability())
                .amount(b.getAmount())
                .status(b.getStatus())
                .scheduleNote(b.getScheduleNote())
                .registered(b.getUser() != null)
                .createdAt(b.getCreatedAt())
                .paidAt(b.getPaidAt())
                .build();
    }

    private static String fullName(User user) {
        String last = user.getLastName() != null ? user.getLastName() : "";
        return (user.getFirstName() + " " + last).trim();
    }

    private static String blankToNull(String value) {
        return (value == null || value.isBlank()) ? null : value.trim();
    }

    private static String firstNonBlank(String first, String second) {
        String chosen = blankToNull(first);
        return chosen != null ? chosen : blankToNull(second);
    }
}