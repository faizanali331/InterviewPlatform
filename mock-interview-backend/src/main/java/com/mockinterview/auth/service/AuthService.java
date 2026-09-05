package com.mockinterview.auth.service;

import com.mockinterview.auth.dto.InterviewerRegisterRequest;
import com.mockinterview.auth.dto.LoginRequest;
import com.mockinterview.auth.dto.LoginResponse;
import com.mockinterview.auth.dto.RegisterRequest;
import com.mockinterview.auth.entity.Role;
import com.mockinterview.auth.entity.User;
import com.mockinterview.auth.repository.RoleRepository;
import com.mockinterview.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private static final java.util.Set<String> BLOCKED_LOGIN_STATUSES =
            java.util.Set.of("SUSPENDED");

    @Transactional
    public User register(RegisterRequest request) {
        return createUser(
                request.getEmail(),
                request.getPassword(),
                request.getFirstName(),
                request.getLastName(),
                request.getPhone(),
                "ROLE_CANDIDATE",
                "ACTIVE",
                true   // candidates don't need admin verification, treat email as sufficient for now
        );
    }

    @Transactional
    public User registerInterviewer(InterviewerRegisterRequest request) {
        return createUser(
                request.getEmail(),
                request.getPassword(),
                request.getFirstName(),
                request.getLastName(),
                request.getPhone(),
                "ROLE_INTERVIEWER",
                "PENDING_VERIFICATION",   // white paper section 8: not ACTIVE until admin approval
                false
        );
    }

    /**
     * Section 6.4 / new admin flow: only ever called by an authenticated
     * SUPER_ADMIN (enforced by @PreAuthorize on the caller's controller,
     * not here - this method itself has no idea who's calling it).
     */
    @Transactional
    public User createAdmin(String email, String rawPassword, String firstName, String lastName, String phone) {
        return createUser(
                email, rawPassword, firstName, lastName, phone,
                "ROLE_ADMIN", "ACTIVE", true
        );
    }

    /**
     * Single source of truth for "create a User row." Every registration
     * path - candidate, interviewer, admin - funnels through here so the
     * duplicate-email check and password hashing can't drift between them.
     */
    private User createUser(
            String email, String rawPassword, String firstName, String lastName,
            String phone, String roleName, String status, boolean emailVerified) {

        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Email is already registered");
        }

        Role role = roleRepository.findByName(roleName)
                .orElseThrow(() -> new IllegalStateException(roleName + " not found"));

        User user = new User();
        user.setEmail(email);
        user.setPasswordHash(passwordEncoder.encode(rawPassword));
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setPhone(phone);
        user.setStatus(status);
        user.setEmailVerified(emailVerified);
        user.setRole(role);

        return userRepository.save(user);
    }

    @Transactional(readOnly = true)
    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new IllegalArgumentException("Invalid email or password");
        }
        if (BLOCKED_LOGIN_STATUSES.contains(user.getStatus())) {
            throw new IllegalStateException("Account is suspended. Status: " + user.getStatus());
        }

        String token = jwtService.generateToken(user);

        return LoginResponse.builder()
                .email(user.getEmail())
                .role(user.getRole().getName())
                .token(token)
                .build();
    }
}